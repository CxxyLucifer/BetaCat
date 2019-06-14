import { Dimensions, PixelRatio } from "react-native";
//UI主色
//const brand-theme = '#f23030';//换肤色
const brandPrimary = "#5491de";
const brandPrimaryTap = "#487FCA";
const brandPrimaryLighter = "#d5e8ff";
//屏幕宽高
const deviceWidth = Dimensions.get("window").width; //屏幕可视宽度
const deviceHeight = Dimensions.get("window").height; //屏幕可视高度
const navigationBarHeight = 45; //顶部导航高度
//UI主COLOR基调
const colors = {
    // 全局/品牌色
    brandPrimary: brandPrimary,
    brandPrimaryTap: brandPrimaryTap,
    brandPrimaryLighter: brandPrimaryLighter,
    brandAssist: "#ff0000",
    brandSecondary: "#323641",
    brandHot: "#f43530",
    brandImportant: "#f43530",
    brandSuccess: "#09bb07",
    brandWarning: "#ffbe00",
    brandError: "#f76260",
    //文字色
    textBase: "#666",
    textBaseInverse: "#fff",
    textSecondary: "#333",
    textPlaceholder: "#999",
    textDisabled: "#ccc",
    textCaption: "#999",
    textParagraph: "#666",
    textHighlight: brandPrimary,
    textLink: brandPrimary,
    iconBase: "#999",
    // 阴影色
    shadow: "rgba(0, 0, 0, .21)",
    // 背景色
    fillBody: "#f4f5f7",
    fillBase: "#fff",
    fillBaseLight: "#f4f5f7",
    fillTap: "#f9f9f9",
    fillDisabled: "#b8b8b8",
    fillMask: "rgba(0, 0, 0, .5)",
    fillOverlayInverse: "rgba(0, 0, 0, .7)",
    // 透明度
    opacityDisabled: 0.6,
    topBackgroundColor: "#2b3643",
    // 边框色
    borderBase: "#d9d9d9",
    borderSplit: "#eee" //分隔线颜色
};
//字体
const font = {
    // 字体家族
    familyBase: '_apple_system,"SF UI Text",Roboto,Noto,"Helvetica Neue",`elvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans_serif',
    familyCode: "Consolas,Menlo,Courier,monospace",
    // 字体尺寸
    textBase: 12,
    sizeXs: 10,
    sizeDefault: 12,
    sizeCaptionSm: 13,
    sizeBase: 14,
    sizeSecondary: 15,
    sizeSubhead: 15,
    sizeCaption: 16,
    sizeHeading: 18,
    sizeSm: 18,
    sizeMd: 21,
    sizeLg: 24,
    sizeXl: 30,
    //背景
    fillBase: "transparent" //rn的text默认带有白底
};
//边框
const border = {
    // 圆角
    radiusXs: 2,
    radiusSm: 4,
    radiusMd: 10,
    // 边框尺寸
    widthSm: 1 / PixelRatio.get(),
    widthMd: 2 / PixelRatio.get(),
    widthLg: 4 / PixelRatio.get(),
    //边框颜色
    color: colors.borderBase,
    split: colors.borderSplit
};
// 间距
const spacing = {
    default: 15,
    // 水平间距
    horizontalXs: 2,
    horizontalSm: 5,
    horizontalMd: 10,
    horizontalLg: 15,
    // 垂直间距
    verticalXs: 2,
    verticalSm: 5,
    verticalMd: 10,
    verticalLg: 15,
    verticalXl: 20,
    verticalXxl: 30
};
// 字体图标大小
const icon = {
    sizeXxs: 14,
    sizeXs: 16,
    sizeSm: 18,
    sizeMd: 22,
    sizeLg: 36
};
//按钮Button
const button = {
    height: 44,
    fontSize: 17,
    spacing: 15,
    heightMd: 35,
    fontSizeMd: 16,
    spacingMd: 15,
    heightSm: 30,
    fontSizeSm: 13,
    spacingSm: 15,
    primaryFill: brandPrimary,
    primaryFillTap: brandPrimaryTap,
    ghostColor: brandPrimary,
    ghostColorTap: brandPrimaryTap,
    defaultColor: colors.borderBase,
    defaultFillTap: "#ddd",
    linkFontColor: brandPrimary,
    linkFontSize: font.sizeBase
};
//输入框TextInput
const inputItem = {
    height: 50,
    labelWidth: 85,
    fontSize: font.sizeSecondary,
    fontExtraSize: font.sizeSecondary,
    textColor: colors.textSecondary,
    iconColor: "#999",
    extraColor: colors.textSecondary
};
//searchBar
const searchBar = {
    height: 36,
    fontSize: font.sizeBase
};
//dropDown
const dropDown = {
    height: 44,
    horizontalSpacing: 15,
    fontSize: font.sizeBase,
    textColor: colors.textBase,
    textSelectedColor: colors.textSecondary
};
//TabBarIOS
const tabBar = {
    height: 44,
    fontColor: colors.textSecondary,
    fontColorSelected: brandPrimary,
    fill: "#ebeeef"
};
//tabs
const tabs = {
    height: 44,
    fontSize: font.sizeSecondary
};
//tag
const tag = {
    height: 32,
    fontSize: font.sizeBase,
    borderRadius: border.radiusSm,
    heightMd: 28,
    fontSizeMd: font.sizeDefault,
    heightSm: 18,
    fontSizeSm: font.sizeDefault,
    defaultFill: colors.fillBody,
    defaultBorderColor: colors.fillBody,
    defaultTextColor: colors.textBase,
    primaryFill: colors.brandPrimary,
    primaryBorderColor: colors.brandPrimary,
    primaryTextColor: colors.textBaseInverse,
    hotFill: colors.brandHot,
    hotBorderColor: colors.brandHot,
    hotTextColor: colors.textBaseInverse,
    warningFill: colors.brandWarning,
    warningBorderColor: colors.brandWarning,
    warningTextColor: colors.textBaseInverse,
    successFill: colors.brandSuccess,
    successBorderColor: colors.brandSuccess,
    successTextColor: colors.textBaseInverse,
    color: brandPrimary
};
//noticeBar，如：公告
const noticeBar = {
    height: 36,
    fill: brandPrimaryLighter,
    color: brandPrimary
};
//segmentedControl，如：商品详情中图文详情和属性参数切换
const segmentedControl = {
    height: 40,
    fontColor: "#fff",
    fill: brandPrimary,
    borderColor: brandPrimary
};
const list = {
    lineHeight: 22,
    briefLineHeight: 18,
    textSizeSmall: 13,
    textSizeBase: 15,
    textBaseColor: colors.textSecondary,
    textExtraColor: "#999",
    textCaptionColor: colors.textCaption,
    fillTap: colors.fillTap,
    verticalSpacing: 10,
    horizontalSpacing: 15,
    listItemHeight: 50,
    briefHeight: 10
};
const modal = {
    zindex: 999,
    borderRadius: 5,
    borderWidth: border.widthSm,
    borderColor: border.split,
    vSpacingMd: 10,
    vSpacingLg: 15,
    vSpacingXl: 20,
    hSpacingSm: 5,
    hSpacingLg: 15,
    hSpacingXl: 20,
    fontSizeHeading: 17,
    fontSizeBase: font.sizeBase,
    colorBase: colors.textSecondary,
    colorLink: colors.brandPrimary,
    colorCaption: colors.textCaption,
};
//通用属性值
const values = {
    //navigationBar
    navigationBarHeight: navigationBarHeight,
    //device
    deviceWidth: deviceWidth,
    deviceHeight: deviceHeight
};
const pages = {
    content_default_bg: '#f9f9f9',
};
export default {
    border,
    button,
    colors,
    dropDown,
    font,
    list,
    modal,
    icon,
    inputItem,
    noticeBar,
    searchBar,
    segmentedControl,
    spacing,
    tabBar,
    tabs,
    tag,
    values,
    pages
};
