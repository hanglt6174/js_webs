import { DrmSamplePage } from './app.po';

describe('drm-sample App', () => {
  let page: DrmSamplePage;

  beforeEach(() => {
    page = new DrmSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
