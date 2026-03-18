// 商品数据 - 您可以修改这个数组来添加/编辑商品
const products = [
    {
        id: 1,
        name: "无线蓝牙耳机",
        description: "高保真音质，降噪功能，长达30小时续航",
        price: 299,
        image: "images/earphone.jpg",
        category: "电子产品",
        detailPage: "products/product1.html",
        wpsFile: "wps-files/product1-details.wps"
    },
    {
        id: 2,
        name: "智能手表",
        description: "健康监测，运动追踪，IP68防水",
        price: 599,
        image: "images/smartwatch.jpg",
        category: "电子产品",
        detailPage: "products/product2.html",
        wpsFile: "wps-files/product2-details.wps"
    },
    {
        id: 3,
        name: "便携式咖啡杯",
        description: "保温保冷，防漏设计，一键开启",
        price: 89,
        image: "images/cup.jpg",
        category: "生活用品",
        detailPage: "products/product3.html",
        wpsFile: "wps-files/product3-details.wps"
    },
    {
        id: 4,
        name: "背包",
        description: "大容量多功能，防水材质，人体工学设计",
        price: 189,
        image: "images/backpack.jpg",
        category: "户外用品",
        detailPage: "products/product4.html",
        wpsFile: "wps-files/product4-details.wps"
    },
    {
        id: 5,
        name: "无线键盘",
        description: "机械轴体，多设备切换，RGB背光",
        price: 349,
        image: "images/keyboard.jpg",
        category: "电脑配件",
        detailPage: "products/product5.html",
        wpsFile: "wps-files/product5-details.wps"
    },
    {
        id: 6,
        name: "桌面加湿器",
        description: "静音运行，夜灯功能，自动湿度控制",
        price: 129,
        image: "images/humidifier.jpg",
        category: "家居电器",
        detailPage: "products/product6.html",
        wpsFile: "wps-files/product6-details.wps"
    }
];

// 页面加载完成后渲染商品
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    
    if (productsContainer) {
        renderProducts(productsContainer);
    }
});

// 渲染商品卡片
function renderProducts(container) {
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=商品图片'">
            <div class="product-info">
                <span style="background:#e3f2fd;color:#1976d2;padding:0.2rem 0.6rem;border-radius:12px;font-size:0.8rem;">
                    ${product.category}
                </span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">¥${product.price}</div>
                <div class="product-actions">
                    <a href="${product.detailPage}" class="btn btn-primary">
                        <i class="fas fa-info-circle"></i> 查看详情
                    </a>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}