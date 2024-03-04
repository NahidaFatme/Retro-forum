const allPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts
    allPostCards(posts);
}

allPost();

const allPostCards = posts => {
    const  mainCards = document.getElementById('main-cards-container');
    for (const post of posts) {
        // active button 
        let isActive = post.isActive;
        if (isActive) {
            activeColor ='bg-green-500';
        }
        else {
            activeColor = 'bg-red-500';
        }
        const div = document.createElement('div');
        div.classList = `flex flex-col lg:flex-row gap-6 p-10 rounded-3xl bg-[#F3F3F5] hover:bg-[#797DFC1A] hover:border-2 hover:border-secondary`;
        div.innerHTML = `
                <div class="relative avatar h-[105px]">
                    <div class="absolute -top-2 -right-1 ${activeColor} rounded-full w-5 h-5"></div>
                    <div class="w-24 rounded-2xl">
                    <img src="${post.image}" />
                    </div>
                </div>
                <div class="flex flex-col gap-4 grow">
                    <div class="flex gap-6">
                        <h5 class="text-sm text-third font-medium">#${post.category}</h5>
                        <h5 class="text-sm text-third font-medium">Author : ${post.author.name}</h5>
                    </div>
                    <h2 class="text-2xl font-bold text-primary">${post.title}</h2>
                    <p class="text-base font-medium text-third">${post.description}</p>
                    <div class="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
                        <div class="flex gap-3">
                            <div class="flex gap-3 justify-center items-center">
                                <i class="fa-regular fa-message"></i>
                                <p class="text-base font-bold text-third">${post.comment_count}</p>
                            </div>
                            <div class="flex gap-3 justify-center items-center">
                                <i class="fa-regular fa-eye"></i>
                                <p class="text-base font-bold text-third">${post.view_count}</p>
                            </div>
                            <div class="flex gap-3 justify-center items-center">
                                <i class="fa-regular fa-clock"></i>
                                <p class="text-base font-bold text-third">${post.posted_time}</p>
                            </div>
                        </div>
                        <div onclick="recentViewed('${post.id}', '${post.title}', '${post.view_count}'), totalReadNumber(1)" class="justify-end" ><img src="images/message.png" alt=""></div>
                    </div>
                </div>
        
        `;
        mainCards.appendChild(div);
    }
}

function recentViewed(id, title, viewCount) {
    const sidecard = document.getElementById('sidecard');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex flex-row items-center gap-12 bg-white p-4 mt-4 rounded-2xl">
            <h2 class="text-xl font-bold text-primary">${title}</h2>
            <div class="flex gap-3 justify-center items-center text-xl font-bold text-third">
                <i class="fa-regular fa-eye"></i>
                <p>${viewCount}</p>
            </div>
        </div>
    `;
    sidecard.appendChild(div);
}

function totalReadNumber(){
    const totalRead = document.getElementById('totalRead');
    let totalReadCount = parseInt(totalRead.innerText);
    totalReadCount =  totalReadCount+ 1;
    totalRead.innerText = totalReadCount;
}