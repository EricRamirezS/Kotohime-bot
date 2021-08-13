<img width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="Kotohime" src="https://cdn.discordapp.com/app-icons/386007907113762816/c5cbfcc5c98879b98710e4abdd8007d8.png">  

# Kotohime

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/H2H31CS8H)
[![Donate on PayPal](https://img.shields.io/badge/paypal-donate-blue.svg)](https://paypal.me/TouhouPlus)
[![Discord](https://discordapp.com/api/guilds/385986894678196234/embed.png)](https://discord.gg/paD7W5F)

<hr>

Kotohime es un bot escrito en Javascript usando
[discord.js](https://discord.js.org/) junto con el framework
[Commando](https://github.com/discordjs/Commando). Está orientada especialmente a servidores dedicados a Touhou Project,
pero es lo suficientemente versátil para encajar en cualquier tipo de servidor.

# [Server Principal](https://discord.gg/paD7W5F) | [Invitar](https://discord.com/oauth2/authorize?client_id=386007907113762816&scope=bot&permissions=372296705)

## Tabla de contenidos

- [Copyright](#copyright)
- [Permisos](#permisos)
- [Configuraciones](#Configuraciones)
    * [Configuración de arrestos](#Configuración_de_arrestos)
    * [Configuraciones de Rol](#Configuraciones_de_Rol)
    * [Configuraciones de Canales](#Configuraciones_de_Canales)
    * [Grupos de comandos](#Grupos_de_comandos)
    * [Prefijo](#Prefijo)
- [Comandos](#Comandos)
    * [Admin](#Admin)
    * [Miscelánea](#Miscelanea)
    * [Común](#Comun)
    * [Touhou Project](#Touhou_Project)
    * [Danmaku!! Card Game](#Danmaku_Card_Game)
    * [Genshin Impact](#Genshin_Impact)
    * [Música](#Musica)
    * [Kotohime Bot!](#Kotohime_Bot)
- [Licencia](#Licencia)
- [Créditos](#Creditos)

## Copyright

- ©2017-2021 EricRamirezS#5684
- Avatar Art: ©2017 Hazama-Yuutou

## Permisos

Kotohime necesita diversos permisos para hacer lo que hace. Abajo encontrarás una lista con cada permiso que solicita, y
para qué será usado.

- **Gestionar roles**: Es utilizado en el comando ban, y los comandos para auto-asignación de roles.
- **Cambiar apodo**: No es _necesario_, pero se incluye como permiso básico.
- **Ver canales**: Es necesario para que todos los comandos funcionen.
- **Leer mensajes**: Es necesario para que todos los comandos funcionen.
- **Insertar enlaces**: Es necesario para los mensajes con embedidos. Muchos comandos lo utilizan.
- **Adjuntar archivo**: Es necesario para enviar imágenes, los comandos relacionados a safebooru y rule34 lo utilizan.
- **Conectar**: Le permite a Kotohime conectarse a canales de voz. Necesario para los comandos de música.
- **Hablar**: Le permite a Kotohime hablar por canales de voz. Necesario para los comandos de música.
- **Usar Actividad de voz**: No es _necesario_, pero es incluido como precaución extra para los comandos de voz.

#### NOTA
* `<parámetro>` parámetro obligatorio.
* `[parámetro]` Parámetro opcional.

## Configuraciones

Kotohime es un bot configurable, para realizar diversas tareas o apoyar a los administradores/moderadores

Para modificar cualquier configuración, utiliza el siguiente comando

`config <configuracion> <valor>`

Para ver las configuraciones actuales, utiliza

`config ver`

### Configuración_de_arrestos

Kotohime "**banea**" a los usuarios de manera diferente a como lo hacer Discord. El arresto de Kotohime no conlleva
expulsión del servidor.

Ten en cuenta que **deberás crear un rol que prohíba** al usuario realizar acciones dentro del servidor. También se
recomienda crear un canal de prisión para que el usuario pueda apelar si lo considera necesario, y los moderadores
puedan tomar decisiones, sin afectar al resto del servidor

* `rol-arrestar [rol]`: Configura el rol para usuario arrestado, este rol se les asignará cuando un administrador/moderador
  arreste al usuario a través del comando `arrestar`. **Esta configuración es necesario para que los comandos `arrestar` y `liberar` funcione.**
    * Ejemplo: `config rol-arrestar @Arrestado`
* `prision [canal]`: (opcional) Configura el canal de prisión, donde se informará al usuario que ha sido arrestado.
* `anuncio-baneos [canal]`: (opcional) Configura el canal donde Kotohime informará a la comunidad que un usuario ha sido
  arrestado.

### Configuraciones_de_Rol

Los siguientes comandos requieren que Kotohime tenga el permiso de Gestionar roles, para funcionar apropiadamente.

* `rol-agregar <rol>`: Registra un rol que los usuarios puedan agregarse manualmente
* `rol-eliminar <rol>`: Remueve un rol de los que usuarios puedan agregarse manualmente

### Configuraciones_de_Canales

* `canal-bienvenida [canal]`: Registra el canal donde Kotohime anunciará que alguien se unió o abandonó el servidor.
* `log-voz [canal]`: Registra el canal donde Kotohime informará sobre los movimientos en canales de voz.

### Grupos_de_comandos

Los siguientes grupos de comandos vienen desactivados por defecto, 
corresponden a temas más específicos.

* `comandos-touhou <¿permitir?>` : Grupo de comandos relacionados a Touhou Project.
* `comandos-danmaku <¿permitir?>` : Grupo de comandos relacionados con juego de cartas Danmaku!! Card Game de Mystery
  Parfait.
* `comandos-genshin <¿permitir?>` : Grupo de comandos relacionados a Genshin Impact.

### Prefijo

* `prefijo <prefijo>` : Cambia el prefijo al cual debo responder.

## Comandos

### Admin

* **rol:** Permite a los usuarios agregarse o eliminarse un rol.
* **configuraciones:** Permite a los administradores cambiar las configuraciones bot.
* **feedback:** Envía un mensaje privado al desarrollador de este bot.
* **invitardev:** Envía un enlace de invitación al desarrollador del bot.
* **arrestar:** "arresta" a un usuario **si está configurado.**
* **liberar:** remueve el "arresto" a un usuario **si está configurado.**

### Anime

* **tracemoe:** Enviame una imagen e intentaré averiguar de qué anime es.
* **saucenao:** Envíame una imagen e intentaré averiguar de donde proviene.
* **rule34:** Envía una imagen al azar con los tags mencionados.
    * Solo funciona en canales NSFW
    * ¡Contenido pornográfico explícito!
* **safebooru:** Envía una imagen al azar con los tags mencionados.
    * Hay una gran cantidad de tags bloqueados para mantener los servidores SFW.
    * Estos tags bloqueados serán ignorados si el canal está marcado como NSFW.
  
### Miscelanea

* **blah:** blah.
* **lenny:** ( ͡~ ͜ʖ ͡°)
* **lmgtfy:** Déjame googlear eso por ti.
* **roll:** Lanza un dado.
* **shrug:** ¯\\_(ツ)_/¯

### Comun

* **escoger:** Seleccionaré algo al azar entre las opciones que me des.
* **eco:** eco.

### Touhou_Project
#### Requiere activar el grupo en configuraciones

* **2hu:** Enviaré una imagen de Touhou Project al azar.
* **9ball:** Enviaré una imagen de Cirno al azar.
* **alice:** Enviaré una imagen de Alice Margatroid al azar.
* **awoo:** Enviaré una imagen de Momiji Inubashiri al azar.
* **ayaya:** Enviaré una imagen de Aya Shameimaru al azar.
* **eirin:** Enviaré una imagen de Eirin Yagokoro al azar.
* **honk:** Enviaré una imagen de Chen al azar.
* **kappa:** Enviaré una imagen de Nitori Kawashiro al azar.
* **koikoi:** Enviaré una imagen de Koishi Komeiji al azar.
* **law:** Enviaré una imagen de Shikieiki Yamaxanadu al azar.
* **miko:** Enviaré una imagen de Reimu Hakure o Sanae Kochiya al azar.
* **mokou:** Enviaré una imagen de Fujiwara no Mokou al azar.
* **mukyu:** Enviaré una imagen de Patchouli Knowledge al azar.
* **pc98:** Enviaré una imagen de la era pc-98 de Touhou al azar.
* **pads:** Enviaré una imagen de Sakuya Izayoi al azar.
* **paruparu:** Enviaré una imagen de Parse Mizuhashi al azar.
* **pure:** Enviaré una imagen de Junko al azar.
* **shoutoku:** Enviaré una imagen de Toyosatomimi no Miko al azar.
* **teruyo:** Enviaré una imagen de Kaguya Houraisan al azar.
* **unyu:** Enviaré una imagen de Utsuho Reiuji al azar.
* **uuu:** Enviaré una imagen de Remilia Scarlet al azar.
* **yuyuko:** Enviaré una imagen de Yuyuko Saigyouji al azar.
* **zun:** Enviaré una imagen de Zun al azar.

### Danmaku_Card_Game
#### Requiere activar el grupo en configuraciones

* **carta:** Enviaré información sobre la carta solicitada.
* **lunatic:** Muestra el estado actual de la expansión Lunatic Extra.
* **mobs:** Muestra el estado actual de la expansión Mutiny of Belittled Spirits.
* **nueuser:** Responde con el saludo de bienvenido clásico de la comunidad de Mistery Parfait.

### Genshin_Impact
#### Requiere activar el grupo en configuraciones

* **amber:** Enviaré una imagen de Amber al azar.
* **baron_bunny:** Enviaré una imagen del Baron Bunny al azar.
* **diona:** Enviaré una imagen de Diona al azar.
* **genshin:** Enviaré una imagen de Genshin Impact al azar.
* **keqing:** Enviaré una imagen de Keqing al azar.
* **klee:** Enviaré una imagen de Klee al azar.
* **sucrose:** Enviaré una imagen de Sacarosa al azar.
* **venti:** Enviaré una imagen de Venti al azar.
* **xiao:** Enviaré una imagen de Xiao al azar.
* **zhongli:** Enviaré una imagen de Zhongli al azar.

### Musica

* **tocar:** reproduce una canción de youtube en un canal de voz.
* **radio:** Transmite Gensokyo radio a un canal de voz.
* **reproduciendo:** Ver la canción reproduciendose actualmente.
* **playlist:** Ver la lista de canciones a tocar.
* **verradio:** Ver la canción reproduciendose en Gensokyo radio.
* **siguiente:** Saltar a la siguiente canción de la playlist.
* **detener:** Detiene la reproducción de música.

### Kotohime_Bot

* **sobremi:** Detalles sobre mi.


## Licencia

El bot está registrado bajo licencia GPL 3.0. Revisa el archivo `LICENSE` para más información. Si vas a usar cualquier
parte del código en tu propio bot, se agradecen los créditos en cualquier parte.

## Creditos

Kotohime utiliza algunas APIS de fuentes externas. También a reutilizado fragmentos de código escritos por otros
usuarios. Gracias a todos los mencionados aquí

- [Dragon Fire](https://github.com/dragonfire535)
  * Xiao bot (Referencias)
- [Gensokyou Radio](https://gensokyoradio.net/)
  * Gensokyo Radio (Streaming)
- [James](https://github.com/james7132)
  * Hourai bot (Referencias)
- [Ko-fi](https://ko-fi.com/)
  * donate (Donaciones)
- [LMGTFY](https://lmgtfy.com/)
  * google (API)
  * lmgtfy (API)
- [npm](https://www.npmjs.com/)
  * dependency-update (API)
  * npm (API)
- [PayPal](https://www.paypal.com/us/home)
  * donate (Donaciones)
- [Rule34](https://rule34.xxx/)
  * Rule34 (API)
- [Safebooru](https://safebooru.org/)
  * safebooru (API)
- [SauceNAO](https://saucenao.com/)
  * SauceNAO (API)
- [Trace.moe](https://trace.moe)
  * tracemoe (API)



  
