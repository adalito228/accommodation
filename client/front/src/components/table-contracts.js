class TableContract extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
  }

  async loadData () {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contracts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      this.data = await response.json()
      return this.data
    } else {
      console.log('error')
    }
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        .container{
          display: flex;
          flex-direction: column; 
        }
        .api-title{
          display: flex;
          gap:5rem; 
          padding-bottom: 2rem;           
        }

        .api-title h1{
          color: hsl(0, 0%, 100%);
          background-color: hsl(220, 100%, 70%); 
          padding: 1rem;
          font-family: "Ubuntu", sans-serif;
          font-size: 1rem;
          margin: 0; 
          text-decoration: none;  
        }
        
        .api-title button{
          color: hsl(0, 0%, 100%);
          background-color: hsl(220, 100%, 70%); 
          padding: .5rem;
          border-radius: 2rem;
          font-family: "Ubuntu", sans-serif;
          font-size: 1rem;
          margin: 0; 
          text-decoration: none;  
        }
        table {   
          width: 100%;
          gap: 0.1rem; 
        }
        th, td {
          background-color: hsl(183, 93%, 25%);
          border: 0.1rem solid #ccc;
          padding: 1rem;
          text-align: left;
          color: hsl(0, 0%, 100%);
        }
        th {
          color: hsl(0, 0%, 100%);
          background-color: hsl(220, 100%, 10%);
          height: 3vh;
        }
        
      </style>
      <div class="container">
        <div class="api-title">
          <h1>${this.title}</h1>
        </div>
        <table>
          <thead id="table-header">            
          </thead>
          <tbody id="table-body">
          </tbody>
        </table>
      </div>
      `

    const button = document.createElement('button')
    button.textContent = 'Show data'
    button.dataset.id = 'data-btn'

    const apiTitle = this.shadowRoot.querySelector('.api-title')
    apiTitle.appendChild(button)

    button.addEventListener('click', async () => {
      await this.renderTable(await this.loadData())
    })
  }

  async renderTable (tableData) {
    const tableHeader = this.shadow.getElementById('table-header')
    const tableBody = this.shadow.getElementById('table-body')

    console.log(tableData)
    if (tableData.length > 0) {
      const headers = Object.keys(tableData[0])
      const headerRow = document.createElement('tr')
      headers.forEach(header => {
        const th = document.createElement('th')
        th.textContent = header
        headerRow.appendChild(th)
      })
      tableHeader.appendChild(headerRow)

      tableData.forEach(item => {
        const row = document.createElement('tr')
        headers.forEach(header => {
          const td = document.createElement('td')

          td.textContent = item[header] || 'N/A'
          row.appendChild(td)
        })
        tableBody.appendChild(row)
      })
    }
  }
}

customElements.define('table-contracts-component', TableContract)
