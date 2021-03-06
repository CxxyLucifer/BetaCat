import { StyleSheet } from 'react-native';
export default (theme) => StyleSheet.create({
    tabbar: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    tabs: {
        height: theme.tab_bar_height,
        borderTopWidth: theme.border_width_md,
        borderColor: theme.border_color_base,
        borderStyle: 'solid',
        flexDirection: 'row',
    },
    barItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barIcon: {
        width: 24,
        height: 24,
        marginTop: 2,
        marginBottom: 4,
    },
    barItemSelected: {},
    barItemTitle: {
        fontSize: theme.font_size_icontext,
        marginTop: 0,
    },
    contentItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        height: 0,
    },
    contentItemSelected: {
        height: undefined,
    },
    badge: {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.brand_important,
        position: 'absolute',
        top: 0,
        left: 20,
        paddingHorizontal: theme.h_spacing_sm,
    },
    badgeText: {
        textAlign: 'center',
        color: 'white',
    },
});
