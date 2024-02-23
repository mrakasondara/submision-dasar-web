document.addEventListener('DOMContentLoaded', ()=>{
    const bookList = document.querySelector('section.book')
    const prevButton = document.querySelector('button.prev')
    const nextButton = document.querySelector('button.next')
    const pageNumber = document.querySelector('p.page')
    const detailBox = document.getElementById('aside')
    const allButton = document.querySelector('li a.all')
    const romanceButton = document.querySelector('a.romance')
    const fantasyButton = document.querySelector('a.fantasy')
    let page = 1
    const getAllBook =  (page) =>{
        let bookData
        fetch(`https://example-data.draftbit.com/books?_page=${page}&_limit=8`).then(response=>response.json().then(response=>{
            bookData = response
            const list = bookData.map(book=> bookCard(book)).join("")
            bookList.innerHTML = list
            const listCard = [...bookList.children]
            listCard.map(list=>{
                const button = list.lastElementChild
                button.addEventListener('click', (e)=> getDetail(e))
            })
        }))
    }
    const bookCard = (book) =>{
        return `
        <article class="card">
            <img src=${book.image_url} alt="Book Image" class="thumb">
            <h4 class="title">${book.title}</h4>
            <button id="detail" data-id=${book.id}>Detail</button>
            </article>
        `
    }
    getAllBook(page)

    nextButton.addEventListener('click', ()=>{
        page++
        pageNumber.textContent = page
        getAllBook(page+1)
    })
    prevButton.addEventListener('click', ()=>{
        if(page > 1){
            page--
            pageNumber.textContent = page
            getAllBook(page-1)
        }else{
            page = 1
            alert('Halaman tidak tersedia')
        }

    })

    const getDetail = (e)=>{
        const id = e.target.dataset.id
        let data
        fetch(`https://example-data.draftbit.com/books/${id}`).then(response=>response.json().then(response=>{
            data = response
            detailBox.innerHTML= `
            <img src=${data.image_url} alt="image" class="thumb">
                <table>
                    <tr>
                        <th>Judul</th>
                        <td>${data.title}</td>
                    </tr>
                    <tr>
                        <th>Penulis</th>
                        <td>${data.authors}</td>
                    </tr>
                    <tr>
                        <th>Halaman</th>
                        <td>${data.num_pages}</td>
                    </tr>
                    <tr>
                        <th>Rate</th>
                        <td>${data.rating}</td>
                    </tr>
                </table>
            `
        }))
    }    

})

