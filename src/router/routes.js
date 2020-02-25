/**
 * 规则:
 * 一、例如 index/index, shop/index 这种以index结尾的, path和name默认去除index
 * 二、例如 shop/list, 默认生成name为shop_list, (如果结尾为index, 例如shop/index则是shop)
 * 三、手动填写后不会自动生成
 */

// 路由配置
const routes = [
  {
    redirect: { name: 'index' },
    component: 'layout',
    children: [
      {
        meta: { title: '后台首页' },
        component: 'index/index'
      },
      {
        meta: { title: '商品列表' },
        component: 'shop/goods/index'
      },
      {
        meta: { title: '新增商品' },
        component: 'shop/goods/add'
      },
      {
        meta: { title: '相册管理' },
        component: 'image/index'
      },
      {
        meta: { title: '测试页' },
        component: 'test/index'
      }
    ]
  },
  {
    meta: { title: '登录页' },
    component: 'login/index'
  },
  { path: '*', redirect: { name: 'index' } }
]

// 获取路由
function getRoutes() {
  // 生成路由详细信息
  createRoutes(routes)
  return routes
}

// 自动生成路由
function createRoutes(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].component) return
    // 去除index
    let val = getShortComponent(arr[i].component)
    // 生成path
    if (val === 'layout') {
      arr[i].path = arr[i].path || '/'
    }
    arr[i].path = arr[i].path || `/${val}`
    // 生成name
    arr[i].name = arr[i].name || val.replace(/\//g, '_')

    // 自动生成component
    let componentFun = import(`@/views/${arr[i].component}`)
    arr[i].component = () => componentFun
    if (arr[i].children && arr[i].children.length > 0) {
      createRoutes(arr[i].children)
    }
  }
}

function getShortComponent(str) {
  let index = str.lastIndexOf('/')
  let val = str.substring(index + 1, str.length)
  if (val === 'index') {
    return str.substring(index, -1)
  }
  return str
}

export default getRoutes()