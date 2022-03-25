let my_MessageInput;

let usersChat = document.getElementsByClassName("allChats");

let chatContent;

let emojiButtonClicked = false;

function emojiPicker (btn){
    let emojiButton = btn.parentElement.parentElement.previousElementSibling;

    emojiButton.classList.toggle('show');


    let emoji = emojiButton.querySelector(".emojis");
    let messageInput = emojiButton.nextElementSibling.querySelector('#messageInput');

    emoji.addEventListener('click',(e)=>{
        messageInput.value += e.target.innerText
    });
}

function fileUpload(file_input){
    let upload_file;
    let file_inputType;

    const reader = new FileReader();

    if(file_input !== undefined){
        reader.addEventListener('load', function() {
            upload_file = reader.result;
            file_inputType = file_input.files[0].name.substring(file_input.files[0].name.lastIndexOf('.') + 1);

            my_MessageInput = file_input.parentElement.previousElementSibling;
            if(upload_file.includes("image/png") || upload_file.includes("image/gif") || upload_file.includes("image/jpeg")){
                my_MessageInput.value = file_input.files[0].name + `\t\t\t\t\t <image src="${upload_file}">`;
            }
            else{
                console.log(file_input.files[0].name.substring(file_input.files[0].name.indexOf('.') + 1));
                my_MessageInput.value = file_input.files[0].name + `\t\t\t\t\t
                    <a href="" class="file__anchor">
                        <div class="fileAttachment__container">
                            <div class="file__icon-container">${file_inputType}</div>
                            <div class="file__name-container">
                                <div class="file__name">${file_input.files[0].name}</div>
                                <div>${niceBytes(file_input.files[0].size)}</div>
                            </div>
                        </div>
                    </a>`
                ;
            }
        });
        reader.readAsDataURL(file_input.files[0]);
    }

    return false;
}

function niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function mySubmitFunction(e) {
    e.preventDefault();
}

function accordionScroll(){
    for(let i=0; i<usersChat.length ; i++){
        usersChat[i].firstElementChild.querySelector('#chat-content').scrollTop = usersChat[i].firstElementChild.querySelector('#chat-content').scrollHeight;
        if(usersChat[i].firstElementChild.nextElementSibling !== null){
            usersChat[i].firstElementChild.nextElementSibling.querySelector('#chat-content').scrollTop = usersChat[i].firstElementChild.nextElementSibling.querySelector('#chat-content').scrollHeight;
        }
        if(usersChat[i].lastElementChild !== null){
            usersChat[i].lastElementChild.querySelector('#chat-content').scrollTop = usersChat[i].lastElementChild.querySelector('#chat-content').scrollHeight;
        }
    }
}

function scrollFunction(btn) {
	chatContent = btn.parentElement.parentElement.querySelector('#chat-content');
	if (chatContent !== null) {
		chatContent.scrollTop = chatContent.scrollHeight;
	}
}

function clientTyping(input) {
    my_MessageInput = input;
	my_MessageInput.addEventListener("keyup", function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			input.parentElement.lastElementChild.firstElementChild.click();
		}
	});
}

function sendMessage(btn) {
    let current = new Date();

    // Resetting File Attachment Button
    btn.previousElementSibling.previousElementSibling.lastElementChild.value = "";

    chatContent = btn.parentElement.parentElement.parentElement.firstElementChild;

    my_MessageInput = btn.parentElement.firstElementChild;
	if (my_MessageInput !== undefined  && my_MessageInput.value.trim() !== "") {
        if(my_MessageInput.value.includes('<a')){
            chatContent.insertAdjacentHTML(
		    	"beforeend",
		    	`
                <div id="file-attachment">
                    ${my_MessageInput.value.substring(my_MessageInput.value.indexOf('<a href="" class="file__anchor">'))}
                    <p class="meta">${current.toLocaleString()}</p>
                </div>
                `
		    );
        }else{
		    chatContent.insertAdjacentHTML(
		    	"beforeend",
		    	`
                <div class="media media-chat media-chat-reverse">
                    <div class="media-body">
                        <p class="messageBox">${my_MessageInput.value}</p>
                        <p class="meta">${current.toLocaleString()}</p>
                    </div>
                </div>`
		    );
        }
        chatContent.scrollTop *= 10;
        console.log(chatContent.scrollTop , chatContent.scrollHeight);
        chatContent.scrollTop = chatContent.scrollHeight;
        console.log(chatContent.scrollTop , chatContent.scrollHeight);

		my_MessageInput.value = "";
	}
}

function closeAccordion(closeButton) {
	closeButton.parentNode.parentNode.parentNode.parentNode.remove();
}

function openChatBox(user) {
	let arr = document.getElementById("all__chats").children;
	if (arr.length == 0) {
		checkFunction(user);
        accordionScroll();

	} else {
		let chatRemove = document.getElementById("all__chats");
        if(arr.length >= 2){
            let firstElement_ID = chatRemove.firstElementChild.getAttribute('id');
            let lastElement_ID = chatRemove.lastElementChild.getAttribute('id')

            chatRemove.firstElementChild.querySelector(`#${firstElement_ID}_collapseTwo`).classList.remove("show");
            chatRemove.lastElementChild.querySelector(`#${lastElement_ID}_collapseTwo`).classList.remove("show");
        }
		if (arr.length > 2) {
			if (
				chatRemove.lastElementChild.getAttribute("id") !== user.getAttribute("id")  &&

				chatRemove.children[1].getAttribute("id") !== user.getAttribute("id")
			) {
				document.getElementById("all__chats").firstElementChild.remove();
			}
		}

		let flag = "";
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].getAttribute("id") == user.getAttribute("id")) {
				flag = "found";

                arr[i].querySelector(`#${user.getAttribute("id")}_collapseTwo`).classList.add("show");
			}
		}
		if (flag !== "found") {
            if(arr.length >= 2){
                let firstElement_ID = chatRemove.firstElementChild.getAttribute('id');
                let lastElement_ID = chatRemove.lastElementChild.getAttribute('id');

                chatRemove.firstElementChild.querySelector(`#${firstElement_ID}_collapseTwo`).classList.remove("show");
                chatRemove.lastElementChild.querySelector(`#${lastElement_ID}_collapseTwo`).classList.remove("show");
            }

			checkFunction(user);
            accordionScroll();
		}
	}
}




let checkFunction = (user) => {
    let current = new Date();
	usersChat[0].insertAdjacentHTML(
		"beforeend",
		`
        <div class="accordion" id="${user.getAttribute("id")}">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="collapsed" onclick="scrollFunction(this)" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${user.getAttribute("id")}_collapseTwo" aria-expanded="false"
                        aria-controls="${user.getAttribute("id")}_collapseTwo">
                        <div class="d-flex align-items-center">
                            <div class="icon__holder">
                                <img src="${user.children[0].firstElementChild.src}"alt="">
                                <div class="${user.children[0].lastElementChild.className}"></div>
                                <!-- <div class="offline"></div> -->
                            </div>
                            <h4 class="card-title"><strong><span class="username">${user.children[1].children[0].innerHTML}</span></strong></h4>
                        </div>
                        <div class="accordian-close" onclick='closeAccordion(this)'>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </button>
                </h2>
                <div id="${user.getAttribute("id")}_collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo"
                    data-bs-parent="#${user.getAttribute("id")}">
                    <div class="accordion-body">
                        <div class="page-content page-container" id="page-content">
                            <div class="row container d-flex justify-content-center">
                                <div class="col-md-6">
                                    <div class="card card-bordered">
                                        <div class="ps-container ps-theme-default ps-active-y" id="chat-content"
                                            style="overflow-y: scroll !important; height:400px !important;">
                                            <div class="media media-chat">
                                                <div class="icon__holder">
                                                    <img src="${user.children[0].firstElementChild.src}"
                                                        alt="">
                                                    <div class="${user.children[0].lastElementChild.className}"></div>
                                                    <!-- <div class="offline"></div> -->
                                                </div>
                                                <div class="media-body">
                                                    <p>Hi</p>
                                                    <p>How are you ...???</p>
                                                    <p>What are you doing tomorrow?<br> Can we come up a bar?</p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div class="media media-meta-day">Today</div>
                                            <div class="media media-chat media-chat-reverse">
                                                <div class="media-body">
                                                    <p>Hiii, I'm good.</p>
                                                    <p>How are you doing?</p>
                                                    <p>Long time no see! Tomorrow office. will be free on sunday.
                                                    </p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div class="media media-chat">
                                                <div class="icon__holder">
                                                    <img src="${user.children[0].firstElementChild.src}" alt="">
                                                    <div class="${user.children[0].lastElementChild.className}"></div>
                                                    <!-- <div class="offline"></div> -->
                                                </div>
                                                <div class="media-body">
                                                    <p>Okay</p>
                                                    <p>We will go on sunday? </p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div class="media media-chat media-chat-reverse">
                                                <div class="media-body">
                                                    <p>That's awesome!</p>
                                                    <p>I will meet you Sandon Square sharp at 10 AM</p>
                                                    <p>Is that okay?</p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div class="media media-chat">
                                                <div class="icon__holder">
                                                    <img src="${user.children[0].firstElementChild.src}"
                                                        alt="">
                                                    <div class="${user.children[0].lastElementChild.className}"></div>
                                                    <!-- <div class="offline"></div> -->
                                                </div>
                                                <div class="media-body">
                                                    <p>Okay i will meet you on Sandon Square </p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div class="media media-chat media-chat-reverse">
                                                <div class="media-body">
                                                    <p>Do you have pictures of Matley Marriage?</p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div class="media media-chat">
                                                <div class="icon__holder">
                                                    <img src="${user.children[0].firstElementChild.src}"
                                                        alt="">
                                                    <div class="${user.children[0].lastElementChild.className}"></div>
                                                    <!-- <div class="offline"></div> -->
                                                </div>
                                                <div class="media-body">
                                                    <p>Sorry I don't have. i changed my phone.</p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div class="media media-chat media-chat-reverse">
                                                <div class="media-body">
                                                    <p>Okay then see you on sunday!!</p>
                                                    <p class="meta">${current.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                                                <div class="ps-scrollbar-x" tabindex="0"
                                                    style="left: 0px; width: 0px;">
                                                </div>
                                            </div>
                                            <div class="ps-scrollbar-y-rail"
                                                style="top: 0px; height: 0px; right: 2px;">
                                                <div class="ps-scrollbar-y" tabindex="0"
                                                    style="top: 0px; height: 2px;">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="emojiPicker" id='emojiPicker'>
                                            <div class="emojis">
                                                <div class="emojiFrame"><span class="emoji">&#128540;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128513;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128514;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128515;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128516;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128517;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128518;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128519;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128521;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128522;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128523;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128524;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128525;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128526;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128527;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128528;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128529;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128530;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128531;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128532;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128533;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128534;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128535;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128536;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128537;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128538;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128539;</span></div>
                                                <div class="emojiFrame"><span class="emoji">&#128546;</span></div>
                                            </div>
                                        </div>

                                        <div class="publisher bt-1 border-light">
                                            <div class="icon__holder">
                                                <img src="${user.children[0].firstElementChild.src}"
                                                    alt="">
                                                <div class="${user.children[0].lastElementChild.className}"></div>
                                                <!-- <div class="offline"></div> -->
                                            </div>
                                            <form id="myform" onsubmit="mySubmitFunction(event); return false;">
                                                <input class="publisher-input" type="text" placeholder="Write something"
                                                    id="messageInput" onkeypress="clientTyping(this)">
                                                <label for="${user.getAttribute("id")}_file__attachment" class="publisher-btn file-group"> <i
                                                        class="fa fa-paperclip file-browser"></i>
                                                    <input onchange="fileUpload(this);" type="file" style="display:none" id="${user.getAttribute("id")}_file__attachment">
                                                </label> <a id="trigger" onclick="emojiPicker(this)" class="publisher-btn" href="#" data-abc="true"><i
                                                        class="fa fa-smile"></i></a> <button type='submit' onclick="sendMessage(this)" class="publisher-btn text-info"
                                                    href="#" data-abc="true"><i class="fa fa-paper-plane"
                                                        id="send__button"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       `
	);
};
