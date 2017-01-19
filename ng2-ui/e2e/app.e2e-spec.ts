import { Ng2UiPage } from './app.po';

describe('ng2-ui App', function() {
  let page: Ng2UiPage;

  beforeEach(() => {
    page = new Ng2UiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
