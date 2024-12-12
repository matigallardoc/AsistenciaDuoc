describe('Verificar mi aplicación', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;


  it('Verificar inicio de sesión con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Iniciar');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('Bienvenido(a)');
        cy.get('#saludo2').contains('Ana Torres');
        cy.get('ion-button').find('ion-icon[name="log-out-outline"]').click({ force: true });


      });
    });
  })

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Iniciar');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('usuario_invalido');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.contains('Iniciar');
      });
    });
  })


  it('Verificar creación de publicación en foro', () => {
    const numero = Math.floor(Math.random() * 1000);  // Genera un número aleatorio
  
    // Login
    cy.visit('http://localhost:8100/ingreso');
    cy.contains('Iniciar');
    cy.get('#correo').invoke('val', '').type('atorres');
    cy.get('#password').invoke('val', '').type('1234');
    cy.contains('Ingresar').click();
  
    cy.get('#saludo').contains('Bienvenido(a)');
    cy.get('[ng-reflect-value="forum"]').click();
  
    // Crear una nueva publicación
    cy.get('#post-title').should('exist').should('be.visible').type(`Título de prueba ${numero}`);
    cy.get('#post-body').should('exist').should('be.visible').type(`Contenido de prueba ${numero}`);
    cy.contains('Guardar').should('be.visible').click();
  
    // Asegurarse de que la publicación fue creada
    cy.contains(`Título de prueba ${numero}`).should('exist');
    cy.contains(`Contenido de prueba ${numero}`).should('exist');
    cy.get('ion-button').find('ion-icon[name="log-out-outline"]').click({ force: true });
  });

  it('Verificar edición de publicación en foro', () => {
    const numero = Math.floor(Math.random() * 1000);  // Genera un número aleatorio
  
    // Login
    cy.visit('http://localhost:8100/ingreso');
    cy.contains('Iniciar');
    cy.get('#correo').invoke('val', '').type('atorres');
    cy.get('#password').invoke('val', '').type('1234');
    cy.contains('Ingresar').click();
  
    cy.get('#saludo').contains('Bienvenido(a)');
    cy.get('[ng-reflect-value="forum"]').click();
  
    // Crear una publicación
    cy.get('#post-title').should('be.visible').type(`Título de prueba ${numero}`);
    cy.get('#post-body').should('be.visible').type(`Contenido de prueba ${numero}`);
    cy.contains('Guardar').click();
  
    // Verificar que la publicación fue creada
    cy.contains(`Título de prueba ${numero}`).should('exist');
  
    // Editar la publicación
    cy.contains(`Título de prueba ${numero}`).parents('ion-card').find('.editar').click();  // Botón de editar
    
    // Limpiar y editar el campo de título y cuerpo
    cy.get('#post-title').should('be.visible').type('{selectall}{backspace}').type(`Título editado ${numero}`);
    cy.get('#post-body').should('be.visible').type('{selectall}{backspace}').type(`Contenido editado ${numero}`);
    
    cy.contains('Actualizar').click();
  
    // Verificar que la publicación fue editada
    cy.contains(`Título editado ${numero}`).should('exist');
    cy.contains(`Contenido editado ${numero}`).should('exist');
  
    // Cerrar sesión
    cy.get('ion-button').find('ion-icon[name="log-out-outline"]').click({ force: true });
  });
  
  

  it('Verificar eliminación de publicación en foro', () => {
    const numero = Math.floor(Math.random() * 1000);  // Genera un número aleatorio
  
    // Login
    cy.visit('http://localhost:8100/ingreso');
    cy.contains('Iniciar');
    cy.get('#correo').invoke('val', '').type('atorres');
    cy.get('#password').invoke('val', '').type('1234');
    cy.contains('Ingresar').click();
  
    cy.get('#saludo').contains('Bienvenido(a)');
    cy.get('[ng-reflect-value="forum"]').click();
  
    // Crear una publicación
    cy.get('#post-title').should('be.visible').type(`Título de prueba ${numero}`);
    cy.get('#post-body').should('be.visible').type(`Contenido de prueba ${numero}`);
    cy.contains('Guardar').click();
  
    // Verificar que la publicación fue creada
    cy.contains(`Título de prueba ${numero}`).should('exist');
  
    // Eliminar la publicación
    cy.contains(`Título de prueba ${numero}`).parents('ion-card').find('.eliminar').click();  // Botón de eliminar
    cy.contains('Eliminar').click();  // Confirmación de eliminación
  
    // Verificar que la publicación fue eliminada
    cy.contains(`Título de prueba ${numero}`).should('not.exist');
    cy.get('ion-button').find('ion-icon[name="log-out-outline"]').click({ force: true });
  });
  
  it('Verificar validaciones de los campos de Mis Datos', () => {
    const numero = Math.floor(Math.random() * 1000);  // Genera un número aleatorio
  
    // Login
    cy.visit('http://localhost:8100/ingreso');
    cy.contains('Iniciar');
    cy.get('#correo').invoke('val', '').type('atorres');
    cy.get('#password').invoke('val', '').type('1234');
    cy.contains('Ingresar').click();
  
    cy.get('#saludo').contains('Bienvenido(a)');
    cy.get('[ng-reflect-value="misdatos"]').click();

    cy.wait(1000); 
    cy.get('#username').find('input').invoke('val', 'atorres').should('be.visible').clear({ force: true }).type(' ', { force: true });
    cy.get('#firstname').find('input').invoke('val', 'Ana').should('exist').should('be.visible').clear({ force: true }).type(` `, { force: true });
    cy.get('#lastname').find('input').invoke('val', 'Torres').should('exist').should('be.visible').clear({ force: true }).type(` `, { force: true });
    cy.get('#email').find('input').invoke('val', 'atorres@duocuc.cl').should('exist').should('be.visible').clear({ force: true }).type(`atorres@duocuc`, { force: true });    
    cy.get('#address').scrollIntoView({ offset: { top: 0, left: 0 } },{duration: 1000, force: true }).find('input').invoke('val', 'La Florida').should('exist').should('be.visible').clear({ force: true }).type(` `, { force: true });
    cy.get('#secretquestion').scrollIntoView({ offset: { top: 0, left: 0 } },{duration: 1000, force: true }).find('input').invoke('val', '¿Cuál es tu animal favorito?').should('exist').should('be.visible').clear({ force: true }).type(` `, { force: true });
    cy.get('#secretanswer').scrollIntoView({ offset: { top: 0, left: 0 } },{duration: 1000, force: true }).find('input').invoke('val', 'gato').should('exist').should('be.visible').clear({ force: true }).type(` `, { force: true });
    cy.get('#password').find('input').invoke('val', '1234').should('exist').clear({ force: true }).type(` `, { force: true });
    cy.get('#password2').find('input').invoke('val', '1234').should('exist').should('be.visible').clear({ force: true }).type(` `, { force: true });
    cy.get('ion-select#education') 
    .click({ force: true });

    cy.contains('OK').click();

    // cy.get('#birth').
    // invoke('val', '1/5/2000').should('exist').should('be.visible').clear({ force: true }).type(`1`, { force: true });
    // cy.contains('Actualizar').click();
    cy.get('ion-button').find('ion-icon[name="log-out-outline"]').click({ force: true });
  });

  it('Verificar actualizacion de los campos de Mis Datos', () => {
    const numero = Math.floor(Math.random() * 1000);  // Genera un número aleatorio
  
    // Login
    cy.visit('http://localhost:8100/ingreso');
    cy.contains('Iniciar');
    cy.get('#correo').invoke('val', '').type('atorres');
    cy.get('#password').invoke('val', '').type('1234');
    cy.contains('Ingresar').click();
  
    cy.get('#saludo').contains('Bienvenido(a)');
    cy.get('[ng-reflect-value="misdatos"]').click();

    cy.wait(1000); 
    cy.get('#username').find('input').invoke('val', 'atorres').should('be.visible').clear({ force: true }).type('atorres', { force: true });
    cy.get('#firstname').find('input').invoke('val', 'Ana').should('exist').should('be.visible').clear({ force: true }).type(`Ana`, { force: true });
    cy.get('#lastname').find('input').invoke('val', 'Torres').should('exist').should('be.visible').clear({ force: true }).type(`Torres`, { force: true });
    cy.get('#email').find('input').invoke('val', 'atorres@duocuc.cl').should('exist').should('be.visible').clear({ force: true }).type(`atorres@duocuc.cl`, { force: true });
    
    cy.get('#address').scrollIntoView({ offset: { top: 0, left: 0 } },{duration: 1000, force: true }).find('input').invoke('val', 'La Florida').should('exist').should('be.visible').clear({ force: true }).type(`La Florida`, { force: true });
    cy.get('#secretquestion').scrollIntoView({ offset: { top: 0, left: 0 } },{duration: 1000, force: true }).find('input').invoke('val', '¿Cuál es tu animal favorito?').should('exist').should('be.visible').clear({ force: true }).type(`¿Cuál es tu animal favorito?`, { force: true });
    cy.get('#secretanswer').scrollIntoView({ offset: { top: 0, left: 0 } },{duration: 1000, force: true }).find('input').invoke('val', 'gato').should('exist').should('be.visible').clear({ force: true }).type(`gato`, { force: true });
    cy.get('#password').find('input').invoke('val', '1234').should('exist').clear({ force: true }).type(`1234`, { force: true });
    cy.get('#password2').find('input').invoke('val', '1234').should('exist').should('be.visible').clear({ force: true }).type(`1324`, { force: true });
    cy.get('ion-select#education') 
    .click({ force: true });

    cy.contains('OK').click();

    // cy.get('#birth').
    // invoke('val', '1/5/2000').should('exist').should('be.visible').clear({ force: true }).type(`1/5/2000`, { force: true });
    cy.contains('Actualizar').click();
    cy.get('ion-button').find('ion-icon[name="log-out-outline"]').click({ force: true });
  });


});
