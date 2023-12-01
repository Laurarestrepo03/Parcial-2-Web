## Album

### Add an album
Esta prueba verifica la correcta creación de un álbum con un título no vacío. Es importante hacer esta prueba porque, además de ser un método importante, es necesario añadir un álbum para hacer otras pruebas.

### Add an album w/ invalid title
Esta prueba intenta añadir un álbum con un título vacío, lo cual no es posible. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y comprobar que un álbum con título vacío no sea añadido.

### Get one album
Esta prueba permite recuperar un álbum añadido previamente. Es importante hacer esta prueba porque, además de ser un método importante, verifica que la adición de un álbum haya funcionado.

### Get an invalid album
Esta prueba intenta recuperar un álbum con un id inválido. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque un álbum que no existe.

### Add a photo to an album
Esta prueba permite añadir una foto a un álbum. Es importante hacer esta prueba para verificar la correcta adición de una foto a un álbum, así como también la correcta creación de tanto el álbum como la foto.

### Add an invalid photo to an album
Esta prueba intenta añadir una foto con un id inválido a un álbum. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque insertar una foto que no existe a un álbum.

### Add a photo to an invalid album
Esta prueba intenta añadir una foto a un álbum con un id inválido. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque insertar una foto a un álbum que no existe.

### Add a photo w/ invalid date to an album
Esta prueba intenta añadir una foto a un álbum donde la fecha de la foto no se encuentra entre las fechas del álbum. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque insertar una foto con fecha errónea a un álbum.

### Delete an album
Esta prueba permite borrar un álbum. Es importante hacer esta prueba porque, además de ser un método importante, permite comprobar que un álbum se elimina correctamente cuando no tiene fotos.

### Delete an invalid album
Esta prueba intenta borrar un álbum con un id inválido. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se intente eliminar un álbum que no existe.

### Delete an album w/ photos
Esta prueba intenta borrar un álbum con fotos. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se intente eliminar un álbum que tiene fotos.

## Foto

### Add a photo
Esta prueba verifica la correcta creación de una foto con valores de ISO, obturación y apertura adecuados. Es importante hacer esta prueba porque, además de ser un método importante, es necesario añadir una foto para hacer otras pruebas.

### Add a photo w/ invalid ISO
Esta prueba intenta añadir una foto con un ISO fuera de los límites establecidos, lo cual no es posible. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y comprobar que una foto con un ISO incorrecto no sea añadida.

### Add a photo w/ invalid valObturacion
Esta prueba intenta añadir una foto con una obturación fuera de los límites establecidos, lo cual no es posible. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y comprobar que una foto con una obturación incorrecta no sea añadida.

### Add a photo w/ invalid apertura
Esta prueba intenta añadir una foto con una apertura fuera de los límites establecidos, lo cual no es posible. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y comprobar que una foto con una apertura incorrecta no sea añadida.

### Add a photo w/ invalid avg values
Esta prueba intenta añadir una foto con valores de ISO, obturación y apertura dentro de sus límites, pero donde los 3 son mayores a su valor medio, lo cual no es posible. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y comprobar que una foto con valores incorrectos no sea añadida.

### Add a photo w/ invalid date
Esta prueba crea una foto con una fecha que se encuentra por fuera de las fechas de un álbum. Es importante hacer esta prueba para ejecutar la prueba de adición de una foto con fecha inválida a un álbum. Esta prueba como tal no verfica la creación de una foto, sino que es una ayuda para la prueba de álbum mencionada. 

### Get one photo
Esta prueba permite recuperar una foto añadida previamente. Es importante hacer esta prueba porque, además de ser un método importante, verifica que la adición de una foto haya funcionado.

### Get an invalid photo
Esta prueba intenta recuperar una foto con un id inválido. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se busque una foto que no existe.

### Get all photos
Esta prueba intenta recuperar todas las fotos. Es importante hacer esta prueba porque, además de ser un método importante, verifica que la adición de todas las fotos haya funcionado.

### Delete a photo
Esta prueba permite borrar una foto. Es importante hacer esta prueba porque, además de ser un método importante, permite comprobar, en dado caso de que esta foto haya sido añadida a un álbum, que ya no aparezca dentro de él. Además, también permite comprobar, al correr la prueba Get one album, que un álbum haya sido borrado si la foto eliminada era la última.

### Delete an invalid photo
Esta prueba intenta borrar una foto con un id inválido. Es importante hacer esta prueba para verificar que la lógica haya sido definida correctamente y se muestre un mensaje de error cuando se intente eliminar una foto que no existe.

## Red social


## Usuario