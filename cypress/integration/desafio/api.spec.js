context('Teste de api', () => {
  describe('List releases', () => {
    it('Test listar release api', () => {
      const username = Cypress.env('username');
      const repository = Cypress.env('repository');
      cy.request(
        `https://api.github.com/repos/${username}/${repository}/releases`
      ).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
