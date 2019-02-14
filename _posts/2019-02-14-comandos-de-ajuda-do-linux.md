---
layout:      post
title:       'Comandos de ajuda do Linux'
date:        2019-02-14 11:25:17 -0200
update:      
description: 'Apresenta alguns comandos que ajudam a entender o que são e/ou pra que servem os comandos do Linux.'
author:      robertopc
published:   true
tags:        [linux]
permalink:    blog/comandos-de-ajuda-do-linux/
---

Este post apresenta alguns comandos que ajudam a entender o que são e/ou pra que servem os comandos do Linux.

## Parâmetro `--help`
Este é o parâmetro contido na maioria dos comandos do Linux. Se você não sabe o que o comando faz, digite o comando seguido de `--help` que ele mostrará um pequeno manual.
```bash
$ uname --help
Usage: uname [OPTION]...
Print certain system information.  With no OPTION, same as -s.

  -a, --all                print all information, in the following order,
                             except omit -p and -i if unknown:
  -s, --kernel-name        print the kernel name
  -n, --nodename           print the network node hostname
  -r, --kernel-release     print the kernel release
  -v, --kernel-version     print the kernel version
  -m, --machine            print the machine hardware name
  -p, --processor          print the processor type (non-portable)
  -i, --hardware-platform  print the hardware platform (non-portable)
  -o, --operating-system   print the operating system
      --help     display this help and exit
      --version  output version information and exit

GNU coreutils online help: <http://www.gnu.org/software/coreutils/>
Full documentation at: <http://www.gnu.org/software/coreutils/uname>
or available locally via: info '(coreutils) uname invocation'
```

## Comando `man`
Este é o comando mais útil para te ajudar no Linux. Ele mostrará o manual completo do comando, descrevendo todas as opções e tudo que o comando pode fazer.
```bash
$ man uname
UNAME(1)                                                             User Commands                                                            UNAME(1)

NAME
       uname - print system information

SYNOPSIS
       uname [OPTION]...

DESCRIPTION
       Print certain system information.  With no OPTION, same as -s.

       -a, --all
              print all information, in the following order, except omit -p and -i if unknown:

       -s, --kernel-name
              print the kernel name

       -n, --nodename
              print the network node hostname

       -r, --kernel-release
              print the kernel release

       -v, --kernel-version
              print the kernel version

       -m, --machine
              print the machine hardware name

       -p, --processor
              print the processor type (non-portable)

       -i, --hardware-platform
              print the hardware platform (non-portable)

       -o, --operating-system
              print the operating system

       --help display this help and exit

       --version
              output version information and exit

AUTHOR
       Written by David MacKenzie.

REPORTING BUGS
       GNU coreutils online help: <http://www.gnu.org/software/coreutils/>
       Report uname translation bugs to <http://translationproject.org/team/>

COPYRIGHT
       Copyright © 2017 Free Software Foundation, Inc.  License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>.
       This is free software: you are free to change and redistribute it.  There is NO WARRANTY, to the extent permitted by law.

SEE ALSO
       arch(1), uname(2)

       Full documentation at: <http://www.gnu.org/software/coreutils/uname>
       or available locally via: info '(coreutils) uname invocation'

GNU coreutils 8.28                                                   January 2018                                                             UNAME(1)
```
> Obs. 1: Nem todos os comandos possuem manual, porém, a maioria possui.
> 
> Obs. 2: Para navegar pelo manual, utilize os atalhos do [vi](https://pt.wikipedia.org/wiki/Vi).

* [man na Wikipedia](https://en.wikipedia.org/wiki/Man_page)

## Comando `info`
Este comando é parecido com o comando `man`, com adicional de possuir informações mais bem apresentadas. Porém muitos programas não dão suporte a ele, prefira utilizar sempre o `man`.
```bash
$ info uname
File: coreutils.info,  Node: uname invocation,  Next: hostname invocation,  Prev: nproc invocation,  Up: System context

21.4 ‘uname’: Print system information
======================================

‘uname’ prints information about the machine and operating system it is
run on.  If no options are given, ‘uname’ acts as if the ‘-s’ option
were given.  Synopsis:

     uname [OPTION]...

   If multiple options or ‘-a’ are given, the selected information is
printed in this order:

     KERNEL-NAME NODENAME KERNEL-RELEASE KERNEL-VERSION
     MACHINE PROCESSOR HARDWARE-PLATFORM OPERATING-SYSTEM

   The information may contain internal spaces, so such output cannot be
parsed reliably.  In the following example, RELEASE is
‘2.2.18ss.e820-bda652a #4 SMP Tue Jun 5 11:24:08 PDT 2001’:

     uname -a
     ⇒ Linux dumdum 2.2.18 #4 SMP Tue Jun 5 11:24:08 PDT 2001 i686 unknown unknown GNU/Linux

   The program accepts the following options.  Also see *note Common
options::.

‘-a’
‘--all’
     Print all of the below information, except omit the processor type
     and the hardware platform name if they are unknown.

‘-i’
‘--hardware-platform’
     Print the hardware platform name (sometimes called the hardware
     implementation).  Print ‘unknown’ if this information is not
     available.  Note this is non-portable (even across GNU/Linux
     distributions).

‘-m’
‘--machine’
     Print the machine hardware name (sometimes called the hardware
     class or hardware type).

‘-n’
‘--nodename’
     Print the network node hostname.

‘-p’
‘--processor’
     Print the processor type (sometimes called the instruction set
     architecture or ISA). Print ‘unknown’ if this information is not
     available.  Note this is non-portable (even across GNU/Linux
     distributions).

‘-o’
‘--operating-system’
     Print the name of the operating system.

‘-r’
‘--kernel-release’
     Print the kernel release.

‘-s’
‘--kernel-name’
     Print the kernel name.  POSIX 1003.1-2001 (*note Standards
     conformance::) calls this “the implementation of the operating
     system”, because the POSIX specification itself has no notion of
     “kernel”.  The kernel name might be the same as the operating
     system name printed by the ‘-o’ or ‘--operating-system’ option, but
     it might differ.  Some operating systems (e.g., FreeBSD, HP-UX)
     have the same name as their underlying kernels; others (e.g.,
     GNU/Linux, Solaris) do not.

‘-v’
‘--kernel-version’
     Print the kernel version.

   An exit status of zero indicates success, and a nonzero value
indicates failure.
```
* [info na Wikipedia](https://en.wikipedia.org/wiki/Info_(Unix))

## Comando `whatis`
`whatis`(o que é, em português), mostra uma descrição simples do que é ou o que faz comando.
```bash
$ whatis uname
uname (1)            - print system information
uname (2)            - get name and information about current kernel
```
* [whatis na Wikipedia](https://en.wikipedia.org/wiki/Whatis)

## Comando `whereis`
`whereis`(onde está, em português), mostra a localização do programa na máquina.
```bash
$ whereis uname
uname: /bin/uname /usr/share/man/man2/uname.2.gz /usr/share/man/man1/uname.1.gz
```
* [type no Wikipedia](https://en.wikipedia.org/wiki/Whereis)

## Comando `type`
Mostra de que tipo é o comando executado.
```bash
$ type uname
uname is /bin/uname # binário
$ type cd
cd is a shell builtin # comando embutido do shell
$ type ll
ll is aliased to 'ls -lah' # alias
```
* [type na Wikipedia](https://en.wikipedia.org/wiki/Type_(Unix))

## Comando `apropos`
Pesquisa comandos baseado numa **palavra-chave** de busca. Ou seja, exibe todos os comandos que possui a **palavra-chave** na descrição.
```bash
$ apropos music # music é a palavra chave desta pesquisa
cmus (1)             - C* Music Player
cmus-tutorial (7)    - C* Music Player tutorial
rhythmbox (1)        - music player and library for tagged files using GStreamer
```
* [apropos na Wikipedia](https://en.wikipedia.org/wiki/Apropos_(Unix))
