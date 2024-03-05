# Troubleshooting

Segue soluções abaixo dos erros mais comuns no Backstage:

## Backstage não está importando automaticamente

Para o Backstage importar automaticamente o catálogo, existem alguns requisitos que precisam ser atendidos:

- O arquivo do catálogo que representa o seu repositório tem que estar na raiz do repositório GitHub.
- O nome do arquivo do catálogo deve ser `catalog-info.yaml`.
- O arquivo do catálogo precisa estar na branch `main` ou `master` no GitHub.

!!! warning "Repositórios na organização stone-payments na branch master"

    Atualmente não suportamos import automático de repositórios da organização **stone-payments** na branch **master**. Se esse for o seu caso, importe manualmente.

## Fluxo de importar manualmente o catálogo de branch temporária

!!! warning "O nome da sua branch pode causar erros"

    O nome da sua branch não pode ter o caractere **/**.

Se for realmente necessário fazer esse teste, siga o fluxo abaixo para evitar erros (considerando que já tenha um arquivo de catálogo existente do seu projeto):

1. Dê `unregister` na `Location` que represente o seu catálogo, ela geralmente tem como nome `generated-<id>`.
2. Tente importar novamente.

Siga passo a passo abaixo para encontrar a `Location` mencionada anteriormente:

1. Tente importar o seu catálogo para pegar o nome da Location.
2. Vá em catalogo e selecione para aparecer apenas Location.
3. Filtre a Location pelo nome.
4. Entre na Location e clique em `unregister`.

Acesse o [vídeo](https://stonepgto.slack.com/files/U01TJ5ELNLB/F05CVL89QJD/grava____o_de_tela_de_2023-06-14_10-35-14.webm) caso esteja com dúvidas sobre o passo a passo acima!
