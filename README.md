# Hackathon 2: Web E-commerce de Tecnología 📱🛒💻

¡Bienvenidos a la Hackathon 2 del curso Desarrollo Basado en Plataformas! En esta ocasión, construirán una **aplicación web** para un ecommerce de productos tecnológicos inspirada en Amazon. 📦🛍️

> **Restricciones Importantes:** Este proyecto es exclusivamente para una plataforma web. Deberán usar **React** con **TypeScript**, y **Tailwind CSS** para desarrollar la interfaz.

La API está preconfigurada y lista para ser usada como una "caja negra" para que enfoquen sus esfuerzos en la experiencia mobile. ¡Buena suerte y disfruten de esta experiencia! 🎉

## Objetivos 🎯

1. **Autenticación de Usuario** 🔐
   Diseñar y conectar una pantalla de autenticación para el usuario en la aplicación web, integrándola con la API.
   - **Criterio de éxito:** La app debe permitir registrar e iniciar sesión, con persistencia de sesión en la aplicación. Los usuarios autenticados deben acceder a las operaciones permitidas para cada rol (explicadas mas adelante en este documento).

2. **Interfaz de Productos** 📲
   Implementar una pantalla que muestre la lista de productos con paginación, para una experiencia de navegación continua.
   - **Criterio de éxito:** La app debe cargar los productos de la API usando paginación, con una experiencia de navegación fluida.

3. **Gestión de Carrito de Compras** 🛒
   Crear un carrito de compras que permita agregar, editar y eliminar productos, y que esté sincronizado con la API.
   - **Criterio de éxito:** El usuario debe poder ver su carrito, modificar cantidades de productos y realizar la compra desde la app.

4. **Consumo de Detalles de Productos** 🔍
   Crear una vista de detalles de producto con información adicional (imagen, precio, estrellas, etc.).
   - **Criterio de éxito:** Al seleccionar un producto, el usuario debería poder ver la información completa del producto y una opción para agregarlo al carrito.

## Funcionalidades de Usuario 👥

### Roles de Usuario 👥

Existen dos roles principales: **Administrador** (`admin`) y **Cliente** (`client`).

#### Administrador 👨‍💼

- **Acciones permitidas**: realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.
- **Restricciones**: no tiene acceso al carrito de compras y solo puede eliminar y actualizar productos que haya creado.
- **Vista**: debe incluir una tabla o lista que permita administrar los productos (no existe endpoint con filtro, por lo que se debera hacer la validacion de si es el dueño en cada componente).

#### Cliente 👤

- **Acciones permitidas**: ver productos, añadir productos al carrito y realizar la compra.
- **Restricciones**: no puede modificar los productos en el inventario.
- **Vista**: tiene acceso de lectura a todos los producots y acceso completo a su carrito de compras y la posibilidad de gestionar productos en el mismo.

## Documentación de la API 📚

> Aquí encontrarás la documentación completa de cada endpoint de la API. [https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1](https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1/)

### Endpoints

Cada endpoint incluye la descripción y el detalle de los parámetros de entrada y salida. Recuerden que algunos endpoints requieren autenticación (🔐), y es necesario incluir el token en la cabecera de la solicitud.

### Crear un nuevo usuario (`POST /auth/register`) 🔓

**Descripción:** Crea un nuevo usuario en el sistema con un rol específico.

| Campo            | Tipo     | Descripción                               |
|------------------|----------|-------------------------------------------|
| `username`       | String   | Nombre de usuario único                   |
| `password`       | String   | Contraseña del usuario                    |
| `role`           | String   | Rol del usuario (`admin` o `client`)      |

**Respuesta exitosa (201):** `{ "message": "Usuario creado exitosamente." }`

**Respuestas de error:**

- `409`: registro de un usuario existente.
- `400`: campos faltantes o inválidos.
- `500`: error interno del servidor. (Avisar a los TAs 😱)

### Autenticar un usuario (`POST /auth/login`) 🔓

**Descripción:** Autentica a un usuario con su nombre de usuario y contraseña.

| Campo            | Tipo     | Descripción                               |
|------------------|----------|-------------------------------------------|
| `username`       | String   | Nombre de usuario                         |
| `password`       | String   | Contraseña del usuario                    |

**Respuesta exitosa (200):** `{ "token": "<token de autenticación>" }`

**Respuestas de error:**

- `401`: credenciales inválidas.
- `400`: campos faltantes o inválidos.
- `500`: error interno del servidor. (Avisar a los TAs 😨)

### Crear un item (`POST /item`) 🔐

**Descripción:** Permite que un usuario administrador cree un nuevo producto.

| Campo               | Tipo       | Descripción                                  |
|---------------------|------------|----------------------------------------------|
| `boughtInLastMonth` | Integer    | Cantidad de compras en el último mes         |
| `imgUrl`            | String     | URL de la imagen del producto                |
| `isBestSeller`      | Boolean    | Indica si es un producto más vendido         |
| `price`             | Double     | Precio del producto                          |
| `stars`             | Integer    | Puntuación del producto (0 a 5)              |
| `title`             | String     | Nombre del producto                          |

**Respuesta exitosa (201):** `{ "itemId": "<id del producto>", "message": "Item created successfully" }`

**Respuestas de error:**

- `403`: no autorizado.
- `400`: campos faltantes o inválidos.
- `500`: error interno del servidor. (Avisar a los TAs 😰)

### Editar un item (`PUT /item`) 🔐

**Descripción:** Actualiza la información de un producto existente.

| Campo               | Tipo       | Requerido | Descripción                                  |
|---------------------|------------|-----------|----------------------------------------------|
| `itemId`            | String     | Sí        | ID del producto a modificar                  |
| `boughtInLastMonth` | Integer    | Sí        | Cantidad de compras en el último mes         |
| `imgUrl`            | String     | Sí        | URL de la imagen                             |
| `isBestSeller`      | Boolean    | Sí        | Si es un producto más vendido                |
| `price`             | Double     | Sí        | Precio del producto                          |
| `stars`             | Integer    | Sí        | Puntuación (0 a 5)                           |
| `title`             | String     | Sí        | Nombre del producto                          |

**Respuesta exitosa (200):** `{ "message": "Producto actualizado con éxito." }`

**Respuestas de error:**

- `400`: campos faltantes o json inválidos.
- `403`: no autorizado, probablemente no es el dueño del producto.
- `404`: producto no encontrado.
- `500`: error interno del servidor. (Avisar a los TAs 🗿)

### Eliminar un item (`DELETE /item/{id}`) 🔐

**Descripción:** Elimina un producto del inventario.

| Parámetro          | Tipo       | Descripción                                  |
|--------------------|------------|----------------------------------------------|
| `id`               | String     | ID del producto a eliminar                   |

**Respuesta exitosa (200):** `{ "message": "Item updated successfully!" }`

**Respuestas de error:**

- `400`: campos faltantes o json inválidos.
- `403`: no autorizado, probablemente no es el dueño del producto.
- `404`: producto no encontrado.
- `500`: error interno del servidor. (Avisar a los TAs 😱)

### Obtener un item (`GET /item/{id}`) 🔐

**Descripción:** Recupera la información de un producto específico.

| Parámetro          | Tipo       | Descripción                                  |
|--------------------|------------|----------------------------------------------|
| `id`               | String     | ID del producto a obtener                    |

**Respuesta exitosa (200):** `{"itemId": "<id>", "title": "<nombre>", "price": "<precio>", ...}`

**Respuestas de error:**

- `400`: falta el path parameter.
- `404`: producto no encontrado.
- `500`: error interno del servidor. (Avisar a los TAs 😱)

### Obtener Items con paginación (`GET /items?limit={limit}&lastKey={lastKey}`) 🔓

**Descripción:** Recupera una lista de productos con paginación.

| Parámetro          | Tipo       | Requerido | Descripción                                 |
|--------------------|------------|-----------|---------------------------------------------|
| `limit`            | Integer    | Sí        | Cantidad de items a obtener                 |
| `lastKey`          | String     | No        | Clave para obtener los siguientes items     |

**Respuesta exitosa (200):** `{ "items": [<array de items>], "lastKey": "<última clave>" }`

**Respuestas de error:**

- `400`: falta el query parameter o es inválido.
- `500`: error interno del servidor. (Avisar a los TAs 😤)

### Agregar un item al carrito (`PUT /cart`) 🔐

| Campo              | Tipo     | Requerido | Descripción                             |
|--------------------|----------|-----------|-----------------------------------------|
| `itemId`           | String   | Sí        | ID del item                             |
| `userId`           | String   | Sí        | ID del usuario                          |

**Respuesta exitosa (200):** `{ "message": "Item successfully added to cart." }`

**Respuestas de error:**

- `400`: campos faltantes o json inválidos.
- `500`: error interno del servidor. (Avisar a los TAs ⚠️)
- `404`: producto no encontrado.

### Obtener el carrito de un usuario (`GET /cart/{userId}`) 🔐

| Parámetro          | Tipo     | Descripción                             |
|--------------------|----------|-----------------------------------------|
| `userId`           | String   | ID del usuario                          |

**Respuesta exitosa (200):** `{"products": [{"itemId": "<id>", "qty": <cantidad>}]}`

**Respuestas de error:**

- `400`: falta el path parameter.
- `404`: carrito no encontrado.
- `500`: error interno del servidor. (Avisar a los TAs 🤡)

## Guía de Implementación Sugerida 📋

1. **Inicio de sesión y Registro**: Configura las pantallas de autenticación primero.
2. **Interfaz de Productos con Scroll Infinito**: Trabaja en la navegación de productos.
3. **Pantalla de Detalles del Producto**: Crea la vista de detalles y la integración con el carrito.
4. **Funcionalidad de Carrito**: Implementa la gestión del carrito para agregar/eliminar productos.
5. **Finalización de la Compra**: Asegúrate de que el flujo de compra esté completamente funcional.

¡Diviértanse y aprovechen para experimentar!
