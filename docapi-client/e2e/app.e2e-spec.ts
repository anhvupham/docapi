import { DacapiClientPage } from './app.po';

describe('dacapi-client App', function() {
  let page: DacapiClientPage;

  beforeEach(() => {
    page = new DacapiClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
