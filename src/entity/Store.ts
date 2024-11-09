/*
* A entidade/tabela/classe desse codigo tem proposito de representar um objeto de loja, nesse caso,essa classe tem papel 
* essencial no papel de compra de jogos.
* Apesar de poder parecer meio sem sentido, o preco dos jogos nao aparece aqui explicitamente
* cada licenca possui individualmente um atributo preco
* A logica ta mais no lance conceitual, a loja assim como um jogador, nao tem o jogo realmente, mas sim varias licencas pra vender
* Isso pode ficar mais claro se voce ver o arquivo Licence.ts
*
* Focando mais aqui no codigo, temos
* - id, o identificador sintetico da loja
* - name, o nome da loja
* - licenses, o conjunto de licencas que a loja possui
* 
* quando alguem compra o jogo eh feito um delete de licence em store
*/


import { Entity, PrimaryGeneratedColumn,OneToMany, Column } from "typeorm";
import { License } from "./License";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  //aqui eh onetomany pois uma loja pode ter varias licencas, mas a licenca so pode estar relaciona a uma loja
  @OneToMany(()=> License, (license) => license.store)
  licenses: License[];

}
