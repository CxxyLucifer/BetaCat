/**
 * Created by liuhui on 2019/6/14.
 */
import Main from './main'; //主页
import PullRefreshListView from './workspace/pull-refresh-list-view';
import ModalDemo from './workspace/modal';
import AntDModal from './workspace/antd-modal';
import ImgUpload from './workspace/img-upload';

import GuidePage from './loading/guide-page'; //引导页
import SplashPage from './loading/splash-page'; //loading页

const routes = {
  Main: { screen: Main },
  PullRefreshListView: { screen: PullRefreshListView },
  ModalDemo: { screen: ModalDemo },
  AntDModal: { screen: AntDModal },
  SplashPage: { screen: SplashPage },
  GuidePage: { screen: GuidePage },
  ImgUpload:{ screen:ImgUpload}
};

export default routes;
