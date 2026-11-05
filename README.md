# JavaScript-Course-

# 🏦 RobertBank - Simulador de Cajero Automático Premium

¡Bienvenido a **RobertBank**! Este es un proyecto de simulación de Cajero Automático (ATM) desarrollado como parte del reto académico del curso de JavaScript. Cuenta con una interfaz moderna basada en componentes táctiles, efectos dinámicos de micro-interacciones y un diseño responsivo avanzado (Neo-Banking).

## 🚀 Demo En Vivo
Puedes interactuar con el cajero automático completamente funcional aquí:
👉 **[Visitar RobertBank en GitHub Pages](https://github.io)**

---

## 🛠️ Características Principales
- **Interfaz Fluida (UX/UI):** Diseño moderno con efectos de partículas de fondo, transiciones cinemáticas entre pantallas y escalado físico de botones al hacer clic.
- **Login Dinámico:** Pantalla de autenticación interactiva que simula una tarjeta plástica de débito real que refleja el DNI en tiempo real mientras el usuario escribe.
- **Notificaciones In-App (Toast Alerts):** Reemplazo completo de las alertas nativas del navegador (`alert()`) por banners flotantes integrados estéticamente en la app.
- **Animaciones de Transacción:** Pantallas dedicadas de carga (*Spinner*) y éxito (*Checkmark* animado) para emular la sincronización de un servidor real.

---

## ⚙️ Reglas de Negocio Implementadas
De acuerdo con los requerimientos obligatorios, el sistema valida y restringe las siguientes operaciones:
1. **Validación de Identidad:** El sistema restringe el ingreso si el DNI no tiene exactamente 8 dígitos numéricos o si no está registrado en el arreglo de cuentas.
2. **Autenticación por Contraseña:** Permite el acceso únicamente si la clave coincide con el perfil seleccionado; de lo contrario, limpia el campo y reinicia el enfoque táctil.
3. **Control de Saldos Absolutos:** Restringe cualquier operación de retiro manual o retiro rápido que intente dejar la cuenta con un saldo inferior a **S/ 0.00**.

---

## 👨‍💻 Base de Datos Local (Arreglo de Objetos)
El sistema simula el almacenamiento del banco de forma local en memoria con tres usuarios preconfigurados:

| Usuario | DNI | Contraseña | Saldo Inicial |
| :--- | :--- | :--- | :--- |
| **Mali** | `44788834` | `1234` | S/ 200.00 |
| **Gera** | `10247439` | `5678` | S/ 150.00 |
| **Sabi** | `98005362` | `9102` | S/ 60.00 |

---

## 🔧 Tecnologías Utilizadas
- **HTML5:** Estructura semántica por bloques de pantallas funcionales.
- **CSS3:** Animaciones cinemáticas `@keyframes`, propiedades personalizadas, Flexbox, CSS Grid y efectos avanzados de desenfoque (*Glassmorphism*).
- **JavaScript (Vanilla JS):** Manipulación del DOM, programación asíncrona (`setTimeout`) para temporizadores de carga, escuchadores de eventos y lógica matemática de transacciones.
