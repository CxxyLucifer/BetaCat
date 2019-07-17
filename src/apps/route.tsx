/**
 * Created by liuhui on 2019/6/14.
 */
import Main from './main'; //主页
import PullRefreshListView from './workspace/pull-refresh-list-view';
import PopUpModelDemo from './workspace/popup-model';

import GuidePage from './loading/guide-page'; //引导页
import SplashPage from './loading/splash-page'; //loading页

const routes = {
  Main: { screen: Main },
  PullRefreshListView: { screen: PullRefreshListView},
  PopUpModelDemo: { screen: PopUpModelDemo},
  SplashPage: { screen: SplashPage },
  GuidePage: { screen: GuidePage },
};

export default routes;
