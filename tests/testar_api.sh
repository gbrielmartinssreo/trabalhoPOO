#!/bin/bash

echo "Escolha o teste que você quer executar:"
echo ""
echo "===== PLAYER ====="
echo "1 - Criar Jogador"
echo "2 - Listar Jogadores"
echo "3 - Atualizar Jogador"
echo "4 - Deletar Jogador"
echo "5 - Adicionar Licença a Jogador"
echo "6 - Remover Licença de Jogador"
echo ""
echo "===== GENRE ====="
echo "7 - Criar Gênero"
echo "8 - Listar Gêneros"
echo "9 - Atualizar Gênero"
echo "10 - Deletar Gênero"
echo ""
echo "===== STORE ====="
echo "11 - Criar Loja"
echo "12 - Listar Lojas"
echo "13 - Atualizar Loja"
echo "14 - Deletar Loja"
echo ""
echo "===== GAME ====="
echo "15 - Criar Jogo"
echo "16 - Listar Jogos"
echo "17 - Atualizar Jogo"
echo "18 - Deletar Jogo"
echo ""
echo "===== LICENSE ====="
echo "19 - Criar Licença"
echo "20 - Listar Licenças"
echo "21 - Atualizar Licença"
echo "22 - Deletar Licença"
echo ""
echo "23 - Sair"
read -p "Opção: " opcao

case $opcao in
    1)
        echo "Executando teste: Criar Jogador"
        curl -X POST http://localhost:3000/players \
        -H "Content-Type: application/json" \
        -d '{"email": "email@exemplo.com", "name": "Nome", "password": "senha", "balance": 100.00}'
        ;;
    2)
        echo "Executando teste: Listar Jogadores"
        curl -X GET http://localhost:3000/players \
        -H "Content-Type: application/json"
        ;;
    3)
        echo "Executando teste: Atualizar Jogador"
        read -p "Email do Jogador: " email
        curl -X PUT http://localhost:3000/players/$email \
        -H "Content-Type: application/json" \
        -d '{"name": "Novo Nome"}'
        ;;
    4)
        echo "Executando teste: Deletar Jogador"
        read -p "Email do Jogador: " email
        curl -X DELETE http://localhost:3000/players/$email \
        -H "Content-Type: application/json"
        ;;
    5)
        echo "Executando teste: Adicionar Licença a Jogador"
        read -p "Email do Jogador: " email
        read -p "ID da Licença: " licenseId
        curl -X POST http://localhost:3000/players/$email/licenses/$licenseId \
        -H "Content-Type: application/json"
        ;;
    6)
        echo "Executando teste: Remover Licença de Jogador"
        read -p "Email do Jogador: " email
        read -p "ID da Licença: " licenseId
        curl -X DELETE http://localhost:3000/players/$email/licenses/$licenseId \
        -H "Content-Type: application/json"
        ;;
    7)
        echo "Executando teste: Criar Gênero"
        curl -X POST http://localhost:3000/genres \
        -H "Content-Type: application/json" \
        -d '{"name": "Nome do Gênero"}'
        ;;
    8)
        echo "Executando teste: Listar Gêneros"
        curl -X GET http://localhost:3000/genres \
        -H "Content-Type: application/json"
        ;;
    9)
        echo "Executando teste: Atualizar Gênero"
        read -p "ID do Gênero: " genreId
        curl -X PUT http://localhost:3000/genres/$genreId \
        -H "Content-Type: application/json" \
        -d '{"name": "Novo Nome do Gênero"}'
        ;;
    10)
        echo "Executando teste: Deletar Gênero"
        read -p "ID do Gênero: " genreId
        curl -X DELETE http://localhost:3000/genres/$genreId \
        -H "Content-Type: application/json"
        ;;
    11)
        echo "Executando teste: Criar Loja"
        curl -X POST http://localhost:3000/stores \
        -H "Content-Type: application/json" \
        -d '{"name": "Nome da Loja", "location": "Localizacao"}'
        ;;
    12)
        echo "Executando teste: Listar Lojas"
        curl -X GET http://localhost:3000/stores \
        -H "Content-Type: application/json"
        ;;
    13)
        echo "Executando teste: Atualizar Loja"
        read -p "ID da Loja: " storeId
        curl -X PUT http://localhost:3000/stores/$storeId \
        -H "Content-Type: application/json" \
        -d '{"name": "Novo Nome da Loja", "location": "Nova Localizacao"}'
        ;;
    14)
        echo "Executando teste: Deletar Loja"
        read -p "ID da Loja: " storeId
        curl -X DELETE http://localhost:3000/stores/$storeId \
        -H "Content-Type: application/json"
        ;;
    15)
        echo "Executando teste: Criar Jogo"
        curl -X POST http://localhost:3000/games \
        -H "Content-Type: application/json" \
        -d '{"title": "Nome do Jogo", "genreId": 1}'
        ;;
    16)
        echo "Executando teste: Listar Jogos"
        curl -X GET http://localhost:3000/games \
        -H "Content-Type: application/json"
        ;;
    17)
        echo "Executando teste: Atualizar Jogo"
        read -p "ID do Jogo: " gameId
        curl -X PUT http://localhost:3000/games/$gameId \
        -H "Content-Type: application/json" \
        -d '{"title": "Novo Nome do Jogo"}'
        ;;
    18)
        echo "Executando teste: Deletar Jogo"
        read -p "ID do Jogo: " gameId
        curl -X DELETE http://localhost:3000/games/$gameId \
        -H "Content-Type: application/json"
        ;;
    19)
        echo "Executando teste: Criar Licença"
        curl -X POST http://localhost:3000/licenses \
        -H "Content-Type: application/json" \
        -d '{"gameId": 1, "storeId": 1, "price": 49.99}'
        ;;
    20)
        echo "Executando teste: Listar Licenças"
        curl -X GET http://localhost:3000/licenses \
        -H "Content-Type: application/json"
        ;;
    21)
        echo "Executando teste: Atualizar Licença"
        read -p "ID da Licença: " licenseId
        curl -X PUT http://localhost:3000/licenses/$licenseId \
        -H "Content-Type: application/json" \
        -d '{"price": 39.99}'
        ;;
    22)
        echo "Executando teste: Deletar Licença"
        read -p "ID da Licença: " licenseId
        curl -X DELETE http://localhost:3000/licenses/$licenseId \
        -H "Content-Type: application/json"
        ;;
    23)
        echo "Saindo"
        exit 0
        ;;
    *)
        echo "Opção inválida"
        ;;
esac
