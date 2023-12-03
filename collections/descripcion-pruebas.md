## Albums

### Add an album
Esta prueba verifica la correcta creación de un álbum con un título no vacío. Es importante hacerla porque, además de ser un método importante, verifica que todos los valores del body cumplan los requerimientos establecidos. No solo eso, sino que es necesario añadir un álbum para hacer otras pruebas.

### Add an album w/ invalid title
Esta prueba intenta añadir un álbum con un título vacío, lo cual no es posible. Es importante hacerla para verificar que la lógica haya sido definida correctamente y comprobar que un álbum con título vacío no sea añadido, además de mostrar un mensaje de error.

### Get one album
Esta prueba permite recuperar un álbum añadido previamente. Es importante hacerla porque, además de ser un método importante, verifica que la adición de un álbum haya funcionado.

### Get an invalid album
Esta prueba intenta recuperar un álbum con un id inválido. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque un álbum que no existe.

### Add a photo to an album
Esta prueba permite añadir una foto a un álbum. Es importante hacerla para verificar la correcta adición de una foto a un álbum, así como también la correcta creación de tanto el álbum como la foto.

### Add a an already added photo to an album
Esta prueba intenta añadir una foto que ya ha sido añadida a un álbum. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque insertar una foto que ya fue previamente añadida.

### Add an invalid photo to an album
Esta prueba intenta añadir una foto con un id inválido a un álbum. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque insertar una foto que no existe a un álbum.

### Add a photo to an invalid album
Esta prueba intenta añadir una foto a un álbum con un id inválido. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque insertar una foto a un álbum que no existe.

### Add a photo to an album w/ 5 photos
Esta prueba intenta añadir una foto a un álbum que ya tiene 5 fotos.  Es importante hacerla para verificar que la traducción del UML se haya hecho correctamente y se muestre un mensaje de error cuando se busque insertar una foto a un álbum lleno.

### Add a photo w/ invalid date to an album
Esta prueba intenta añadir una foto a un álbum donde la fecha de la foto no se encuentra entre las fechas del álbum. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque insertar una foto con fecha errónea a un álbum.

### Delete an album
Esta prueba permite borrar un álbum. Es importante hacerla porque, además de ser un método importante, permite comprobar que un álbum se elimina correctamente cuando no tiene fotos.

### Delete an invalid album
Esta prueba intenta borrar un álbum con un id inválido. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se intente eliminar un álbum que no existe.

### Delete an album w/ photos
Esta prueba intenta borrar un álbum con fotos. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se intente eliminar un álbum que tiene fotos.

## Fotos

### Add a photo
Esta prueba verifica la correcta creación de una foto con valores de ISO, obturación y apertura adecuados. Es importante hacerla porque, además de ser un método importante, verifica que todos los valores del body cumplan los requerimientos establecidos. No solo eso, sino que es necesario añadir una foto para hacer otras pruebas.

### Add a photo w/ invalid ISO
Esta prueba intenta añadir una foto con un ISO fuera de los límites establecidos, lo cual no es posible. Es importante hacerla para verificar que la lógica haya sido definida correctamente y comprobar que una foto con un ISO incorrecto no sea añadida, además de mostrar un mensaje de error.

### Add a photo w/ invalid valObturacion
Esta prueba intenta añadir una foto con una obturación fuera de los límites establecidos, lo cual no es posible. Es importante hacerla para verificar que la lógica haya sido definida correctamente y comprobar que una foto con una obturación incorrecta no sea añadida, además de mostrar un mensaje de error.

### Add a photo w/ invalid apertura
Esta prueba intenta añadir una foto con una apertura fuera de los límites establecidos, lo cual no es posible. Es importante hacerla para verificar que la lógica haya sido definida correctamente y comprobar que una foto con una apertura incorrecta no sea añadida, además de mostrar un mensaje de error.

### Add a photo w/ invalid avg values
Esta prueba intenta añadir una foto con valores de ISO, obturación y apertura dentro de sus límites, pero donde los 3 son mayores a su valor medio, lo cual no es posible. Es importante hacerla para verificar que la lógica haya sido definida correctamente y comprobar que una foto con valores incorrectos no sea añadida, además de mostrar un mensaje de error.

### Add a photo w/ invalid date
Esta prueba crea una foto con una fecha que se encuentra por fuera de las fechas de un álbum. Es importante hacerla para ejecutar la prueba Add a photo w/ invalid date to an album. Esta prueba como tal no verifica la creación de una foto, sino que es una ayuda para la prueba de álbum mencionada. 

### Get one photo
Esta prueba permite recuperar una foto añadida previamente. Es importante hacerla porque, además de ser un método importante, verifica que la adición de una foto haya funcionado.

### Get an invalid photo
Esta prueba intenta recuperar una foto con un id inválido. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque una foto que no existe.

### Get all photos
Esta prueba intenta recuperar todas las fotos. Es importante hacerla porque, además de ser un método importante, verifica que la adición de todas las fotos haya funcionado.

### Delete a photo
Esta prueba permite borrar una foto. Es importante hacerla porque, además de ser un método importante, permite comprobar, en dado caso de que la foto haya sido añadida a un álbum, que ya no aparezca dentro de él. Por otro lado, también permite comprobar, al correr la prueba Get one album, que el álbum haya sido borrado si la foto era la última.

### Delete an invalid photo
Esta prueba intenta borrar una foto con un id inválido. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se intente eliminar una foto que no existe.

## Redes sociales

### Add a social network
Esta prueba verifica la correcta creación de una red social con un slogan de por lo menos 20 caracteres. Es importante hacerla porque, además de ser un método importante, verifica que todos los valores del body cumplan los requerimientos establecidos.

### Add a social network w/ invalid slogan
Esta prueba intenta añadir una red social con un slogan de menos de 20 caracteres, lo cual no es posible. Es importante hacerla para verificar que la lógica haya sido definida correctamente y comprobar que una red social con slogan incorrecto no sea añadida, además de mostrar un mensaje de error.

## Usuarios

### Add a user
Esta prueba verifica la correcta creación de un usuario con un teléfono de solo 10 caracteres. Es importante hacerla porque, además de ser un método importante, verifica que todos los valores del body cumplan los requerimientos establecidos.

### Add a user w/ an invalid phone number
Esta prueba intenta añadir un usuario con un teléfono que no tiene 10 caracteres, lo cual no es posible. Es importante hacerla para verificar que la lógica haya sido definida correctamente y comprobar que un usuario con teléfono incorrecto no sea añadido, además de mostrar un mensaje de error.

### Get one user
Esta prueba permite recuperar un usuario añadido previamente. Es importante hacerla porque, además de ser un método importante, verifica que la adición de un usuario haya funcionado.

### Get an invalid user
Esta prueba intenta recuperar un usuario con un id inválido. Es importante hacerla para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque un usuario que no existe.

### Get all users
Esta prueba intenta recuperar todas los usuarios. Es importante hacerla porque, además de ser un método importante, verifica que la adición de todos los usuarios haya funcionado.
