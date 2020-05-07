context('Teste de tela', () => {
  describe('Login', () => {
    // Validar Login inválido
    it('Falha no Login', () => {
      const username = Cypress.env('username');
      const password = 'senhaincorreta';

      cy.visit('https://github.com');
      cy.get('a[href="/login"]').click();
      cy.get('#login_field').type(username).should('have.value', username);
      cy.get('#password').type(password).should('have.value', password);
      cy.get('input[name="commit"]').click();
      cy.get('.flash > .container-lg')
        .should('contain.text', 'Incorrect username or password.')
        .should('to.have.length', 1);
    });

    // Validar Login válido
    it('Sucesso no login', () => {
      const username = Cypress.env('username');
      const password = Cypress.env('password');

      cy.visit('https://github.com');
      cy.get('a[href="/login"]').click();
      cy.get('#login_field').type(username).should('have.value', username);
      cy.get('#password').type(password).should('have.value', password);
      cy.get('input[name="commit"]').click();
      cy.get('.flash > .container-lg').should('to.have.length', 0);
    });
  });

  let branchName = '';
  describe('Branch', () => {
    // Validar criação de branch
    it('Criar uma branch', () => {
      const username = Cypress.env('username');
      const password = Cypress.env('password');
      const repository = Cypress.env('repository');

      branchName = gerarString();

      cy.visit('https://github.com/login');
      cy.get('#login_field').type(username).should('have.value', username);
      cy.get('#password').type(password).should('have.value', password);
      cy.get('input[name="commit"]').click();
      cy.get('.flash > .container-lg').should('to.have.length', 0);

      cy.get('#dashboard-repos-filter-left').type(repository);
      cy.get(`a[href="/${username}/${repository}"]`).click();
      cy.get('.btn.css-truncate.btn-sm').click();
      cy.get('#context-commitish-filter-field')
        .type(branchName)
        .should('have.value', branchName);

      cy.get('button[class="SelectMenu-item break-word"]').click();
      cy.get('span[class="css-truncate-target"]').should(
        'have.html',
        branchName
      );
    });
  });

  describe('Listar branchs', () => {
    // Validar listagem de branch
    it('Branchs', () => {
      const username = Cypress.env('username');
      const repository = Cypress.env('repository');

      cy.visit('https://github.com');
      cy.get('#dashboard-repos-filter-left').type(repository);
      cy.get(`a[href="/${username}/${repository}"]`).click();
      cy.get(`a[href="/${username}/${repository}/branches"]`).click();
    });
  });
});

function gerarString() {
  return Math.random().toString(36).substr(2, 7);
}
