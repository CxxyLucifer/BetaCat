// 工具方法
import Kit from '../kit';
import PullToRefreshIOS from './index.ios';
import PullToRefreshAndroid from './index.android';
const PullToRefresh = Kit.isAndroid() ? PullToRefreshAndroid : PullToRefreshIOS;
export default PullToRefresh;
