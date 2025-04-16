# Demonstração do Projeto

<div align="center">
    <image src="./assets/demo/login_page.png" alt="Tela de Login" width="240">
    <image src="./assets/demo/home_page.png" alt="Tela Inicial" width="240">
    <image src="./assets/demo/search_page.png" alt="Tela de Pesquisa" width="240">
    <image src="./assets/demo/settings_page.png" alt="Tela de Configurações" width="240">
</div>

# Requisitos  

- Servidor Local Apache e MySQL (Sugestão: [XAMPP](https://www.apachefriends.org/pt_br/download.html))
- [Node.js](https://nodejs.org/en/download) (versão LTS recomendada)
- [Git](https://git-scm.com/downloads)
- [Composer](https://getcomposer.org/download/) (para instalação das dependências do Laravel)

# Instalação e Execução

## 1. Clone o repositório
Primeiro, clone o repositório do projeto (ou baixe o repositório pelo GitHub) dentro da pasta htdocs:

    git clone https://github.com/jesse-barbosa/TechMix.git

## 2. Importe o banco

- 2.1 Primeiro, ligue o servidor Apache e MySQL no XAMPP
- 2.2 Acesse o painel PhpMyAdmin: Digite "localhost/" no endereço de pesquisa do seu navegador
- 2.3 Crie um novo banco de dados com o nome "dbtechmix"
- 2.4 Clique na opção de importar
- 2.5 Importe o arquivo SQL localizado na pasta "banco" do projeto

## 3. Instale as dependências do Laravel

Primeiro, abra a pasta `TechMix/back-end` no terminal:

    cd TechMix/back-end

Em seguida, instale as dependências:

    composer install

## 4. Configure o arquivo .env do Laravel

Dentro da pasta `TechMix/back-end`, copie o arquivo de exemplo `.env.example` e renomeie para `.env`:

## 5. Gere a chave da aplicação Laravel

Ainda dentro da pasta `TechMix/back-end`, execute o seguinte comando para gerar a chave da aplicação:

    php artisan key:generate

Esse comando criará e armazenará uma chave única no arquivo `.env`, essencial para a segurança e criptografia do Laravel.

## 6. Instale as dependências do React Native

Primeiro, abra a pasta `TechMix` no terminal:

    cd TechMix

Em seguida, instale as dependências:

    npm install

## 7. Configure a API

Crie um arquivo `apiConfig.tsx` na pasta raiz do projeto React Native (`TechMix`), e adicione o seguinte conteúdo:

```tsx
export const API_URL = 'http://(seuIP)/api';
```

Substitua `(seuIP)` pelo seu IP real. Caso necessário, defina a porta após a API, por exemplo:

```tsx
export const API_URL = 'http://192.168.0.100:8000/api';
```

## 8. Inicie o Laravel  

Dentro da pasta `TechMix/back-end`, execute o projeto com o comando:

    php artisan serve --host=(seuIP)

Substitua `(seuIP)` pelo seu IP real. Caso necessário, defina a porta após o parâmetro host, por exemplo:

    php artisan serve --host=192.168.0.100 --port=8000

## 9. Inicie o Expo  

Você pode iniciar o projeto diretamente com o comando:

    npx expo start

## 10. Baixe o aplicativo Expo Go no seu celular  

Para visualizar o aplicativo no dispositivo, você precisará do aplicativo Expo Go.  

- [Baixe o Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)  
- [Baixe o Expo Go para iOS](https://apps.apple.com/app/expo-go/id982107779)  

## 11. Execute o aplicativo no seu dispositivo  

Após iniciar o Expo, um QR Code será gerado no terminal ou na janela do navegador que abrirá automaticamente.

1. Abra o aplicativo Expo Go no seu dispositivo.
2. Escaneie o QR Code exibido para carregar o aplicativo.

Agora o aplicativo React Native deve rodar no seu dispositivo.

Se encontrar algum problema ou tiver dúvidas, consulte a [documentação oficial do Expo](https://docs.expo.dev/) ou entre em contato comigo pelo meu e-mail: [barbosajesse419@gmail.com](mailto:barbosajesse419@gmail.com).
