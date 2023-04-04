"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", formSend);

    async function formSend(e) {
        e.preventDefault();
        console.log(e.currentTarget);
        let errorValidate = formValidate(e.currentTarget);
        let formData = new FormData(e.currentTarget);
        console.log(e.currentTarget.elements);
        formData.append("image", formImg.files[0]);
        if (errorValidate === 0) {
            form.classList.add("_sending");
            let response = await fetch("/sendmail.php", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = "";
                form.reset();
                form.classList.remove("_sending");
            } else {
                // alert("Виникла помилка, спробуйте пізніше.");
                form.classList.remove("_sending");
            }
        }
        else {
            // alert("Заповніть обов'язкові поля");
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req");
        console.log(formReq.length);
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);
            if (input.classList.contains("_email")) {
                if (ValidateEmail(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        console.log(error);
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    function ValidateEmail(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    const formImg = document.getElementById("formImg");
    const formPreview = document.getElementById("formPreview");
    formImg.addEventListener("change", () => {
        uploadFile(formImg.files[0]);
    });

    function uploadFile(file) {
        if (!["image/jpeg", "image/png", "img/gif"].includes(file.type)) {
            alert("Дозволено добавляти лише фотографїї!");
            formImg.value = "";
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("Файл повинен бути менше 2 МБ!");
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="foto">`;
        };
        reader.onerror = function (e) {
            alert("Помилка");
        };
        reader.readAsDataURL(file);
    }
});
