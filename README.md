# WoomUp-technicaltest
Prueba técnica WoomUp

En este repositorio se busca responder al requerimiento planteado, que se trata de una serie de endpoints listando a usuarias y sus matchs, estos matchs se dividen en 4 categorias, y en los endpoints podemos solicitar tanto el total por tipo de match por cada usuaria, como un listado con los matchs, los endpoints buscan satisfaces ademas que el calculo de los matchs se haga en tiempo de solicitud al servidor esto quiere decir que a medida que ingresen usuarias en la base de datos se iran calculando sus match respectivos cada vez que se pida al servidor informacion de una usuaria y una lista de usuarias.

El proyecto ejecuta un servidor Node/express y utiliza typescript para mejor lectura del codigo y sus ejemplos.

Para poder ejecutar el proyecto debemos tener instalado Node (una version superior 10) luego clonar el repositorio en una terminal y ejecutamos los siguientes comandos de forma secuencial y en el mismo orden
1:
```bash
git clone https://github.com/galenzo17/WoomUp-technicaltest.git
```
2:
```bash
cd WoomUp-technicaltest
```
3:
```bash
npm i
```
4:
```bash
npm run build
```
5:
```bash
npm start
```
Esto desplegara un servidor en el puerto local 3000.

Para poder interactuar con nuestra API ingresamos la siguiente url, donde prodremos interactuar (crear, editar, listar y eliminar usuarias) y  visualizar como respectivos matchs se van modificando segun corresponda.

http://localhost:3000/docs/


Hecho con amor por Agustin Bereciartua Castillo para 

![alt text](https://cdn.woomup.cl/assets/uploads/2018/12/19112354/wdt_logochico.png)
