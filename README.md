# **Documentacão App mobile – Ignite Gym**
Aplicativo mobile para acompanhamento das atividades físicas realizadas em uma academia.

## Proposta
O aplicativo dispõe de uma interface para o usuário marcar uma série de atividades físicas e registrá-la em seu histórico e assim manter a regularidade de suas atividades. O histórico por sua vez, listará as atividades realizadas, agrupadas por data, favorecendo a motivação e a distribuição regular dos exercícios, melhorando a eficácia dos resultados.

Tecnologias/ferramentas utilizadas:
### Front-end
- React
- Expo
- Native-Base
- Stack-Navigator / Bottom-Navigator
- Image Picker
- Toast
- React-Hook-Forms
- Context
- Schema-Validations/Yup

### Back-end
- Axios
- Interceptors
- Autenticação JWT
- Async Storage
- Token/refresh-token


# O Aplicativo

## TELA 0 (Login e criação de conta)
A tela inicial fornece a interface para acessar ou criar a conta, solicitando o e-mail e a senha. Caso o usuário não tenha cadastro, deve-se clicar em “Criar conta” e realizar seu cadastro. O aplicativo redirecionará para a tela de cadastro solicitando os seguintes dados:
Nome, e-mail, senha e confirmação de senha.
Durante este processo, regras deverão ser respeitadas:
O e-mail deverá respeitar a convenção.
A senha e a confirmação de senha deverão coincidir. Caso não ocorra, o aplicativo lançará um erro, impedindo o prosseguimento.
Ocorrendo o cadastramento com sucesso, o aplicativo redirecionará para a primeira rota da aplicação com o usuário autenticado e registrado no banco de dados.

![tela_login](https://github.com/JsnEvt/ign_gym/blob/main/img/login240x520.png)

## TELA 1 (Início da aplicação / seleção de grupos)
A tela inicial do usuário logado, consiste em um painel na parte superior com a foto do usuário, nome, link de saída da aplicação, botões para seleção por grupo de atividades físicas e a lista de exercícios agrupados pelos grupos selecionados.
Por padrão, o usuário não terá foto definida no perfil. Isto poderá ser feito. Falarei disso quando tratar acerca do perfil do usuário.
O aplicativo contém uma lista de grupos musculares que fornece a lista de exercícios correspondentes àquelas atividades. 
Os grupos são: “Antebraço”, “Bíceps”, “Costas”, “Ombro”, “Peito”, “Pernas”, “Trapézio”, “Tríceps”.
Esta tela fornece a possibilidade do usuário escolher a parte do corpo que quer trabalhar, selecionar o grupo correspondente e obter a lista de atividades que pertence ao grupo selecionado.
Cada item relacionado fornece o nome da atividade, a quantidade de séries e a quantidade de repetições.

![tela1](https://github.com/JsnEvt/ign_gym/blob/main/img/tela1240x520.png)



## TELA  2 (Detalhes do exercício)
Ao clicar em quaisquer dos item relacionados, o aplicativo redirecionará para a tela de detalhes do exercício que conterá um botão para voltar para a tela anterior (lista de atividades), nome da atividade, grupo ao qual pertence, uma animação que descreve como a atividade deverá ser realizada, a quantidade de série e de repetições e um botão de marcar a atividade como realizado.

Ao clicar no botão “Marcar como realizado”, o aplicativo registrará a atividade no banco de dados e redirecionará para a tela de histórico que conterá toda as atividades realizadas pelo usuário durante todo o período agrupado por data.

## TELA 3 (Histórico)
O histórico de exercícios relaciona as atividades físicas marcadas como realizadas na etapa anterior, agrupados por data, exibindo um “cartão” que informa o grupo da atividade, o nome do exercício realizado e a hora em que foi executado.
A qualquer momento, com o usuário logado, esta tela poderá ser acessada através do menu inferior da aplicação – item: histórico.

## TELA 4 (Perfil)
Através do menu inferior, temos acesso ao perfil do usuário, onde podemos adicionar/alterar foto do perfil, alterar o nome para exibição na tela inicial e/ou alterar a senha de acesso.
Esta tela contém um ícone que exibe o perfil do usuário, um link para alterar a foto, dois campos de formulário que informa o nome do usuário que já vem da criação da conta e o respectivo e-mail.
O e-mail vinculado ao usuário será exibido em campo específico e não poderá ser alterado. 
Abaixo, temos 3 campos para alteração de senha, à saber: Senha antiga, Nova senha e Confirmação de senha, campos que deverão respeitar as respectivas regras de validação.
Ao clicar em “Alterar foto”, o usuário será direcionado para uma lista de fotos disponíveis no dispositivo, permitindo escolher e redimensionar para enquadrar a foto desejada. Esta foto não poderá ser maior do que 5Mb. 
Ao selecionar, redimensionar e cortar, o aplicativo armazenará a foto no banco de dados, atualizará a foto do perfil e o perfil exibido assim que o usuário entra na aplicação (TELA1). 


# Segurança
O aplicativo faz uso do recurso de autenticação (token) para logar o usuário e navegar pelas telas. Quando o token é expirado durante a navegação, o back-end se encarregará de gerar um novo token para que a navegação seja fluida.

<sub> By Jason Everton 04/02/2023 </sub>
