SYRUEN v8.1 - Maestro de sedes + Reporte CCTV

Esta versión conserva la v8 y agrega un maestro de sedes ampliado.

NUEVO EN SEDES / MAESTRO
- Formulario completo de datos de la sede.
- Código, cliente, oficina, IP, serial DVR/NVR, SIM, celular.
- Ciudad, dirección, departamento, regional y PONAL.
- Cupo, número de cámaras/canales y número de DVR/NVR.
- Coordinador de zona: nombre, celular y correo.
- Contacto regional: nombre, celular y correo.
- Estado de la sede.
- Maestro de cámaras: etiqueta, número de cámara y DVR/NVR.

NUEVO EN REPORTE CCTV
- Al seleccionar una sede, se muestran automáticamente los datos del maestro.
- La lista de cámaras toma la información registrada en Sedes / maestro.
- Se visualizan etiqueta, número de cámara y DVR/NVR.
- Se puede marcar cada cámara como conectada o no conectada.
- El porcentaje diario se calcula y queda en el histórico.
- El Dashboard muestra los porcentajes por cliente y la evolución diaria.

IMPORTANTE
Este prototipo guarda los datos en localStorage del navegador. Para producción multiusuario se debe conectar a Firebase/Firestore o Microsoft Lists/SharePoint. Los correos reales de aprobación también requieren un servicio de correo/backend.
