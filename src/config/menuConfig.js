module.exports = [
    {
        title: '首页', 
        icon: 'HomeOutlined',
        key: '/home'
    },
    {
        title: '商品',
        icon: 'AccountBookOutlined',
        key: '/production',
        children: [
            {
                title: '品类管理',
                icon: '',
                key: '/production/category-manage'
            },
            {
                title: '商品管理',
                icon: '',
                key: '/production/production-manage'
            }
        ]
    },
    {
        title: '兼职',
        icon: 'ReconciliationOutlined',
        key: '/job',
        children: [
            {
                title: '品类管理',
                icon: '',
                key: '/job/category-manage'
            },
            {
                title: '兼职管理',
                icon: '',
                key: '/job/job-manage'
            }
        ]
    },
    {
        title: '用户管理',
        icon: 'UserSwitchOutlined',
        key: '/user',
    },
    {
        title: '角色管理',
        icon: 'KeyOutlined',
        key: '/role',
    }
]