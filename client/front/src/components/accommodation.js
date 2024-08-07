class Accommodation extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        .api-title{
          color: hsl(0, 0%, 100%);
          font-size: 1.5rem; 
          display: flex;
          flex-direction: column;
          gap:2rem; 
          justify-content: center;
          align-items: center;  
          height: 100vh;
        }

        .api-title h1{
          font-family: "Ubuntu", sans-serif;
          margin: 0; 
            
        }
        .api-title a{
          color: hsl(0, 0%, 100%);;
          background-color: hsl(0, 0%, 0%);; 
          padding: 1rem;
          border-radius: 2rem;
          font-family: "Ubuntu", sans-serif;
          font-size: 1rem;
          margin: 0; 
          text-decoration: none;  
        }
        .api-title a:hover{
          color:green;
        }

        .api-title img{
          max-width: 30%; 
          height: auto; 

        }
      </style>

      <div class="api-title">
        <h1>${this.title}</h1> 
      </div>
      `

    const button = document.createElement('button')
    button.textContent = 'Get Data'
    button.dataset.id = 'data-btn'

    const apiTitle = this.shadowRoot.querySelector('.api-title')
    apiTitle.appendChild(button)

    button.addEventListener('click', async () => {
      const data = await this.formatData()
      if (data) await this.sendDataToServer({ DataFormated: data })
    })
  }

  async getApiData () {
    let response = null
    try {
      response = await fetch('https://catalegdades.caib.cat/resource/j2yj-e83g.json')
      if (!response.ok) {
        console.log(`Error: ${response.status}`)
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor', error.message)
    }
    const jsonData = await response.json()
    return jsonData
  }

  async formatData () {
    const toTransfrom = await this.getApiData()

    const datosConCoordenadas = toTransfrom.map(item => {
      if (item.geocoded_column && item.geocoded_column.coordinates) {
        const [longitude, latitude] = item.geocoded_column.coordinates
        return {
          ...item,
          longitude,
          latitude
        }
      } else {
        return item
      }
    })

    return datosConCoordenadas
  }

  async sendDataToServer ({ DataFormated }) {
    let responseServer = null
    try {
      responseServer = await fetch(`${import.meta.env.VITE_API_URL}/api/front/accommodations`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(DataFormated)
      })
    } catch (error) {
      console.error('Error al enviar los datos al servidor', error.message)
    }
    console.log(responseServer)
    return responseServer
  }
}

customElements.define('accommodation-component', Accommodation)
