# Plugins: Github Pull Request Boards

Uma das principais funcionalidades do Backstage é o Software Catalog, que referenciamos apenas por “catálogo”. O objetivo do catálogo é mapear toda plataforma de software da companhia, cadastrando, por exemplo: sistemas, APIs, websites, recursos de infraestrutura, etc.

!!! quote "Definição oficial"
    _“The Backstage Software Catalog is a centralized system that keeps track of ownership and metadata for all the software in your ecosystem (services, websites, libraries, data pipelines, etc). The catalog is built around the concept of metadata YAML files stored together with the code, which are then harvested and visualized in Backstage.”_

Esse catálogo centralizado traz alguns benefícios para a companhia, tais como:

-   Auxilia os times a gerenciar e manter o software que eles possuem;
-   Facilita a descoberta de todo software da companhia, inclusive os metadados sobre ele (quem é o dono, etc);
-   Facilita o processo de onboarding de novos colaboradores;
-   Auxilia na construção do System Mapping;


Cada tipo de software da companhia é mapeado no System Model do catálogo, que é composto por algumas entidades principais, por exemplo, `Component`, `API` e `Resource`.

!!! tip "Dica"
    Para visualizar a referência das entidades, quais campos são suportados, obrigatórios e opcionais, leia a documentação [Referência das Entidades](../reference/entities.md).

Nesse tutorial, ensinaremos como catalogar uma aplicação utilizando o `Component`, que é o _kind_ do catálogo que representa qualquer tipo de aplicação.

## Criando um `Component`

### Criando o manifesto

O manifesto é um arquivo yaml na raiz do repositório com o nome catalog-info.yaml, embora possa ser criado manualmente seguindo a documentação de campos esperados, recomendamos a utilização da feature de Software Template do Backstage, utilizando um formulário online com validações e sugestões facilita o preenchimento correto do arquivo que será enviado ao repositório de destino através de um Pull Request.

Acesse o menu "Create/Criar” do Backstage e selecione o template "Catalogar uma nova aplicação“:

![](./../img/create-new-component.png)

Preencha o formulário conforme orientação na tela:

![](./../img/template-catalog-a-new-app.png)

Ao final revise as repostas e clique em "Create“ para iniciar o processo de criação do arquivo e de Pull Request:

![](./../img/template-catalog-a-new-app-review-and-create.png)

Acesse o link do Pull Request para prosseguir para as próximas etapas:

![](./../img/template-catalog-a-new-app-tasks-done.png)

### Checando validação do arquivo

Para melhor feedback se o arquivo está construído corretamente, temos um validador que analisa modificações nos arquivos do catálogo.

No Pull Request criado na subseção anterior, você pode visualizar que existe uma checagem com o nome `Backstage Catalog Validator`, nela está indicado se a validação passou com sucesso ou erro e a mensagem de resultado, que aponta um resumo das validações feitas e os erros (se houverem) que devem ser corrigidos.

Um exemplo do resultado esperado pela validação pode ser visto nos _printscreens_ abaixo:

Passed Checks:

![](./../img/catalog-validator-passed.png)

Validator Details:

![](./../img/catalog-validator-passed-details.png)

Abaixo está um exemplo da validação de um manifesto com erro, apontando quais são os atributos que devem ser corrigidos:

Exemplo de falha na validação:

![](./../img/catalog-validator-failed-details.png)

### Visualizando configuração no Backstage

Com o manifesto criado e validado, podemos testar se toda configuração que queremos fazer no nosso `Component` está correta antes de fazer _merge_ no Pull Request. Para isso, vamos cadastrar o `Component` no Backstage com o _path_ para o arquivo na branch `feat-catalog-<my-app-name>`

Entre na [página de registro de entidades no Backstage](https://backstage.stone.tech/create "https://backstage.stone.tech/create") e clique no botão `REGISTER EXISTING COMPONENT`, depois disso, insira a URL exata para o arquivo `catalog-info.yaml`. Abaixo está um exemplo:

![](./../img/register-component-example.png)

Agora clique em `ANALYZE`, depois em `IMPORT` e por último no _link_ do `Component` que foi gerado.

![](./../img/generated-component-example.png)

Agora, se for necessário adicionar mais configurações, faça novos commits na branch do Pull Request até que a configuração desejada esteja completa. Depois disso, clique no menu do canto superior direito e em `UNREGISTER ENTITY`.

![](./../img/unregister-example.png)

### Finalizando configuração e catalogando

Com todas configurações desejadas feitas e com o validador passando, faça o _merge_ do Pull Request e [registre](https://backstage.stone.tech/create "https://backstage.stone.tech/create") o `Component` no catálogo, dessa vez passando a URL do arquivo `catalog-info.yaml` na branch principal.

### Atualizando o manifesto

Depois da aplicação catalogada com a entidade `Component`, imagine que a aplicação estava em desenvolvimento mas agora está pronta para ser _deployada_ em produção. Com isso, precisamos modificar o campo `spec.lifecycle` para representar que o `Component` agora é produtivo.

![](./../img/experimental-lifecycle-example.png)

Nesse caso de atualização, não precisamos fazer o _unregister_ e depois register, igual fizemos anteriormente. Dessa vez, podemos apenas abrir um Pull Request modificando o valor:

![](./../img/update-lifecycle-example.png)

Depois que esse Pull Request for _mergeado_, o novo estado do `Component` estará no Backstage depois de alguns minutos.

![](./../img/production-lifecycle-example.png)
