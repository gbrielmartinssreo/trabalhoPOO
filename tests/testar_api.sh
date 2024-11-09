#!/bin/bash

# Função para exibir e escolher da lista
choose_from_list() {
    local list=("$@")
    PS3="Escolha uma opção: "
    select item in "${list[@]}" "Cancelar"; do
        if [[ $item != "Cancelar" && -n $item ]]; then
            echo "Você escolheu: $item"
            echo $item
            return 0
        else
            echo "Opção cancelada ou inválida."
            return 1
        fi
    done
}

# Função para criar um jogador
create_player() {
    read -p "Email do Jogador: " email
    read -p "Nome do Jogador: " name
    read -p "Senha do Jogador: " password
    read -p "Saldo do Jogador: " balance
    curl -X POST http://localhost:3000/players \
    -H "Content-Type: application/json" \
    -d '{"email": "'"$email"'", "name": "'"$name"'", "password": "'"$password"'", "balance": '"$balance"'}'
}

# Função para listar jogadores
list_players() {
    curl -X GET http://localhost:3000/players -H "Content-Type: application/json"
}

# Função para atualizar um jogador
update_player() {
    read -p "Email do Jogador: " email
    read -p "Novo Nome do Jogador: " name
    curl -X PUT http://localhost:3000/players/$email \
    -H "Content-Type: application/json" \
    -d '{"name": "'"$name"'"}'
}

# Função para deletar um jogador
delete_player() {
    read -p "Email do Jogador: " email
    curl -X DELETE http://localhost:3000/players/$email -H "Content-Type: application/json"
}

# Função para adicionar uma licença a um jogador
add_license_to_player() {
    read -p "Email do Jogador: " email
    read -p "ID da Licença: " licenseId
    curl -X POST http://localhost:3000/players/$email/licenses/$licenseId \
    -H "Content-Type: application/json"
}

# Função para remover uma licença de um jogador
remove_license_from_player() {
    read -p "Email do Jogador: " email
    read -p "ID da Licença: " licenseId
    curl -X DELETE http://localhost:3000/players/$email/licenses/$licenseId \
    -H "Content-Type: application/json"
}

# Função para comprar um jogo
buy_game() {
    read -p "Email do Jogador: " email
    read -p "ID do Jogo: " gameId
    curl -X POST http://localhost:3000/players/$email/buyGame/$gameId \
    -H "Content-Type: application/json"
}

# Função para criar um gênero
create_genre() {
    read -p "Nome do Gênero: " name
    curl -X POST http://localhost:3000/genres \
    -H "Content-Type: application/json" \
    -d '{"name": "'"$name"'"}'
}

# Função para listar gêneros
list_genres() {
    curl -X GET http://localhost:3000/genres -H "Content-Type: application/json"
}

# Função para atualizar um gênero
update_genre() {
    read -p "ID do Gênero: " genreId
    read -p "Novo Nome do Gênero: " name
    curl -X PUT http://localhost:3000/genres/$genreId \
    -H "Content-Type: application/json" \
    -d '{"name": "'"$name"'"}'
}

# Função para deletar um gênero
delete_genre() {
    read -p "ID do Gênero: " genreId
    curl -X DELETE http://localhost:3000/genres/$genreId \
    -H "Content-Type: application/json"
}

# Função para associar gêneros a um jogo
associate_genres_to_game() {
    games=$(curl -X GET http://localhost:3000/games -H "Content-Type: application/json" | jq -r '.[].name')
    games_list=($games)

    genres=$(curl -X GET http://localhost:3000/genres -H "Content-Type: application/json" | jq -r '.[].name')
    genres_list=($genres)

    echo "Escolha um Jogo:"
    game=$(choose_from_list "${games_list[@]}")
    if [ "$game" == "Cancelar" ]; then
        return 1
    fi

    echo "Escolha um ou mais Gêneros (separados por espaço):"
    read -p "Gêneros: " genres_selection
    if [ -z "$genres_selection" ]; then
        echo "Nenhum gênero selecionado. Abortando."
        return 1
    fi

    curl -X POST http://localhost:3000/games/$game/genres \
    -H "Content-Type: application/json" \
    -d '{"genres": ["'$genres_selection'"]}'
}

# Função para criar uma loja
create_store() {
    read -p "Nome da Loja: " name
    read -p "Localização da Loja: " location
    curl -X POST http://localhost:3000/stores \
    -H "Content-Type: application/json" \
    -d '{"name": "'"$name"'", "location": "'"$location"'"}'
}

# Função para listar lojas
list_stores() {
    curl -X GET http://localhost:3000/stores -H "Content-Type: application/json"
}

# Função para atualizar uma loja
update_store() {
    read -p "ID da Loja: " storeId
    read -p "Novo Nome da Loja: " name
    read -p "Nova Localização da Loja: " location
    curl -X PUT http://localhost:3000/stores/$storeId \
    -H "Content-Type: application/json" \
    -d '{"name": "'"$name"'", "location": "'"$location"'"}'
}

# Função para deletar uma loja
delete_store() {
    read -p "ID da Loja: " storeId
    curl -X DELETE http://localhost:3000/stores/$storeId -H "Content-Type: application/json"
}

# Função para adicionar licenças a uma loja
add_licenses_to_store() {
    stores=$(curl -X GET http://localhost:3000/stores -H "Content-Type: application/json" | jq -r '.[] | .name')
    stores_list=($stores)

    licenses=$(curl -X GET http://localhost:3000/licenses -H "Content-Type: application/json" | jq -r '.[] | .id')
    licenses_list=($licenses)

    echo "Escolha uma Loja:"
    store=$(choose_from_list "${stores_list[@]}")
    if [ "$store" == "Cancelar" ]; then
        return 1
    fi

    echo "Escolha uma Licença:"
    license=$(choose_from_list "${licenses_list[@]}")
    if [ "$license" == "Cancelar" ]; then
        return 1
    fi

    curl -X POST http://localhost:3000/stores/$store/licenses/$license \
    -H "Content-Type: application/json"
}

# Função para criar um jogo
create_game() {
    read -p "Nome do Jogo: " name
    read -p "Pontuação do Jogo: " score  # Solicita a pontuação do jogo
    read -p "Desenvolvedor do Jogo: " developer  # Solicita o desenvolvedor do jogo
    curl -X POST http://localhost:3000/games \
    -H "Content-Type: application/json" \
    -d '{"name": "'"$name"'", "score": "'"$score"'", "developer": "'"$developer"'"}'  # Envia todos os atributos
}

# Função para listar jogos
list_games() {
    curl -X GET http://localhost:3000/games -H "Content-Type: application/json"
}

# Função para atualizar um jogo
update_game() {
    read -p "ID do Jogo: " gameId
    read -p "Novo Nome do Jogo: " name
    curl -X PUT http://localhost:3000/games/$gameId \
    -H "Content-Type: application/json" \
    -d '{"name": "'"$name"'"}'
}

# Função para deletar um jogo
delete_game() {
    read -p "ID do Jogo: " gameId
    curl -X DELETE http://localhost:3000/games/$gameId -H "Content-Type: application/json"
}

# Função para criar uma licença
create_license() {
    read -p "ID do Jogo: " gameId
    read -p "ID da Loja: " storeId
    read -p "Preço da Licença: " price
    curl -X POST http://localhost:3000/licenses \
    -H "Content-Type: application/json" \
    -d '{"gameId": "'"$gameId"'", "storeId": "'"$storeId"'", "price": '"$price"'}'
}

# Função para listar licenças
list_licenses() {
    curl -X GET http://localhost:3000/licenses -H "Content-Type: application/json"
}

# Função para atualizar uma licença
update_license() {
    read -p "ID da Licença: " licenseId
    read -p "Novo Preço da Licença: " price
    curl -X PUT http://localhost:3000/licenses/$licenseId \
    -H "Content-Type: application/json" \
    -d '{"price": '"$price"'}'
}

# Função para deletar uma licença
delete_license() {
    read -p "ID da Licença: " licenseId
    curl -X DELETE http://localhost:3000/licenses/$licenseId -H "Content-Type: application/json"
}

# Menu principal com loop
while true; do
    echo ""
    echo "Escolha o teste que você quer executar:"
    echo ""

     # Exibindo as opções de maneira lado a lado
    echo "===== PLAYER =====                    ===== GENRE ====="
    echo "1 - Criar Jogador                     8 - Criar Gênero"
    echo "2 - Listar Jogadores                  9 - Listar Gêneros"
    echo "3 - Atualizar Jogador                 10 - Atualizar Gênero"
    echo "4 - Deletar Jogador                   11 - Deletar Gênero"
    echo "5 - Adicionar Licença a Jogador       12 - Associar Gêneros a Jogo"
    echo "6 - Remover Licença de Jogador"
    echo "7 - Comprar Jogo"
    echo ""
    echo "===== STORE =====                     ===== GAME ====="
    echo "13 - Criar Loja                       18 - Criar Jogo"
    echo "14 - Listar Lojas                     19 - Listar Jogos"
    echo "15 - Atualizar Loja                   20 - Atualizar Jogo"
    echo "16 - Deletar Loja                     21 - Deletar Jogo"
    echo "17 - Adicionar Licenças a Loja"
    echo ""
    echo "===== LICENSE ====="
    echo "22 - Criar Licença"
    echo "23 - Listar Licenças"
    echo "24 - Atualizar Licença"
    echo "25 - Deletar Licença"
    echo ""
    echo "0 - Sair"
    echo ""

    read -p "Opção: " opcao

    case $opcao in
        1) create_player ;;
        2) list_players ;;
        3) update_player ;;
        4) delete_player ;;
        5) add_license_to_player ;;
        6) remove_license_from_player ;;
        7) buy_game ;;
        8) create_genre ;;
        9) list_genres ;;
        10) update_genre ;;
        11) delete_genre ;;
        12) associate_genres_to_game ;;
        13) create_store ;;
        14) list_stores ;;
        15) update_store ;;
        16) delete_store ;;
        17) add_licenses_to_store ;;
        18) create_game ;;
        19) list_games ;;
        20) update_game ;;
        21) delete_game ;;
        22) create_license ;;
        23) list_licenses ;;
        24) update_license ;;
        25) delete_license ;;
        0) echo "Saindo..." ; break ;;
        *) echo "Opção inválida!" ;;
    esac
done
