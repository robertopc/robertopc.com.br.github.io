---
layout:	      post
title:	      'Comando SED: substituição de texto no terminal Linux'
date:	      2017-11-29 19:18:44 -0200
update:  
description:  'Explicação e exemplos de utilização do comando SED para substituição de texto no terminal do Linux.'
published:    true
author:	      RobertoPC
tags:	      [linux, sed]
permalink:    blog/comando-sed-substituicao-de-texto-no-terminal-linux/
---

Neste post segue uma pequena explicação e exemplos de utilização do comando SED para substituição de texto no terminal do Linux.

**O que é o comando SED?**

O comando SED(stream editor) é um editor de texto não interativo para o terminal do Linux.
Com ele podemos editar o conteúdo de arquivos automaticamente através do terminal, como por exemplo substituir textos, apagar linhas, traduzir caracteres, entre outras tarefas.

**Substituindo texto**

Para a substituição de texto, utilizamos o comando <code>'s/busca/substituição/'</code>. No exemplo abaixo, a palavra **limão** é substituida por **laranja**:

```bash
$ echo "Eu gosto de suco de limão." | sed 's/limão/laranja/'
> Eu gosto de suco de laranja.
```

No exemplo anterior, modificamos uma palavra da entrada padrão por outra, podemos realizar a mesma operação com arquivos. Exemplo:

```bash
# criamos o arquivo para o teste
$ echo "Eu gosto de suco de limão." > suco.txt

# executamos o sed com a substituição
$ sed 's/limão/laranja/' suco.txt
> Eu gosto de suco de laranja.
```

O conteúdo da substituição é exibido após a execução do comando, porém o conteúdo do arquivo **não foi alterado**. Para alterar o conteúdo do arquivo, usamos a opção abreviada <code>-i</code> ou <code>--in-place</code>. Exemplo:

```bash
$ sed -i 's/limão/laranja/' suco.txt
# neste caso o conteúdo não é exibido após a execução 

# imprimindo o arquivo vemos a substituição
$ cat suco.txt
> Eu gosto de suco de laranja.
```

No exemplo anterior o conteúdo do arquivo foi alterado, mas tenha cuidado ao usar a opção <code>-i</code>, porque ela sobescreve o conteúdo do arquivo.

Por esta razão existe um parâmetro adicional a opção <code>-i</code> que cria um arquivo de backup. O parâmetro é o seguinte <code>-i[SUFIXO]</code> ou <code>--in-place[=SUFIXO]</code>. Exemplo:

```bash
$ sed -i.bkp 's/laranja/limão/' suco.txt

# ao listar a pasta, vemos o arquivo alterado e o de backup
$ ls
> suco.txt suco.txt.bkp

# imprimindo o arquivo alterado
$ cat suco.txt
> Eu gosto de suco de limão.

# imprimindo o arquivo de backup
$ cat suco.txt.bkp
> Eu gosto de suco de laranja.
```

Devemos salientar que o comando de substituição apresentado até o momento, substitui somente uma palavra por linha. Para substituir a mesma palavra mais de uma vez por linha, devemos usar o parâmetro <code>/g</code>. Exemplo:

```bash
# primeiro inserimos uma nova frase ao suco.txt com dois 'limão'
$ echo "Eu gosto de suco de limão e de picolé de limão." > suco.txt

# ao executar a substituição, vemos que só muda o primeiro 'limão'
$ sed 's/limão/laranja/' suco.txt
> Eu gosto de suco de laranja e de picolé de limão.

# para substituir todas as ocorrências, usamos a opção '/g'
$ sed 's/limão/laranja/g' suco.txt
> Eu gosto de suco de laranja e de picolé de laranja.
```
**Expressões regulares**

A porção de busca no comando de substituição, também pode ser uma expressão regular. Conforme os exemplos a seguir:

```bash
# criamos o arquivo para os testes
$ echo "Eu gosto de suco de limão e mamão. 1234567890" > teste.txt

# substituir limão por mamão e vice-versa
$ sed -i 's/\(limão\) e \(mamão\)/\2 e \1/' teste.txt ; cat teste.txt
> Eu gosto de suco de mamão e limão. 1234567890

# substituir vogais 'o' ou 'u' por 'x'
$ sed -i 's/[ou]/x/g' teste.txt ; cat teste.txt
> Ex gxstx de sxcx de limãx e mamãx. 1234567890

# substituir numeros pares por 0
$ sed -i 's/[2468]/0/g' teste.txt ; cat teste.txt
> Ex gxstx de sxcx de mamãx e limãx. 1030507090

# substituir numeros impares por nada
$ sed -i 's/[13579]//g' teste.txt ; cat teste.txt
> Ex gxstx de sxcx de mamãx e limãx. 00000

# substituir 3 primeiros caracteres por nada
$ sed -i 's/^...//g' teste.txt ; cat teste.txt
> gxstx de sxcx de mamãx e limãx. 00000

# substituindo espaços por nada
$ sed -i 's/\s//g' teste.txt ; cat teste.txt
> gxstxdesxcxdemamãxelimãx.00000
```
**Concluindo**

O comando sed possui muito mais possibilidades do que as mostradas aqui. Caso queira conhece-las, consulte o manual no terminal com o comando <code>man sed</code> ou <code>info sed</code>.
Outra ótima fonte de consulta é o site do [Aurelio Jargas](http://aurelio.net/sed/) sobre sed, o cara é o guru do sed.
