document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger')
  const nav = document.querySelector('.nav-links')

  burger.addEventListener('click', function () {
    nav.classList.toggle('active')
  })

  // Fetch products from FakeStoreAPI
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return displayProducts(data)
    })
    .then(() => {
      // Initialize Slick Slider
      $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
            },
          },
        ],
      })
    })
})

function displayProducts(products) {
  const slider = document.getElementById('slider')

  products.forEach((product) => {
    const productElement = document.createElement('div')
    const slideElement = document.createElement('div')
    productElement.classList.add('product')

    slideElement.id = 'slide' + `${product.id}`
    productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `
    slideElement.appendChild(productElement)

    slider.appendChild(slideElement)
  })
}

function searchProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase()
  const products = document.querySelectorAll('.product')

  let foundIndex = -1

  // Find the index of the first product that matches the search
  products.forEach((product, index) => {
    const productName = product.querySelector('h3').innerText.toLowerCase()
    if (productName.includes(input) && foundIndex === -1) {
      foundIndex = index
    }
  })

  // If a matching product is found, slide to it
  if (foundIndex !== -1) {
    $('.slider').slick('slickGoTo', foundIndex)
  }
}
