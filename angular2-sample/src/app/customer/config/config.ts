/**  APIの情報  **/
export let SERVER_URL = "http://localhost:3000";
export let CUSTOMER_URL = SERVER_URL + "/api/customers";
export let TYPE_URL = SERVER_URL + "/api/customerTypes";

export let PAGE_FROM_NEW = "new";
export let PAGE_FROM_OHTER = "other";

/**  メッセージの内容  **/
export let MODIFY_CONFIRM_MESSAGE = "この内容に変更をします。よろしいですか？";
export let REGISTER_CONFIRM_MESSAGE = "この内容で登録をします。よろしいですか？";
export let BACK_CONFIRM_MESSAGE = "入力した内容は保存されませんが、よろしいですか？";
export let ERROR_MESSAGES = {
            'required': '必須項目です。値を入力してください。',
            'invalidPostcode': '郵便番号は「xxx-xxxx（例：123-1234）」の形式で入力してください。',
            'invalidPhonenumber':'電話番号は「xx-xxxx-xxxx（例：03-1234-5678）」の形式で入力してください。',
            'invalidEmailAddress': 'メールアドレスは「@」「.」を含む形式で入力してください。'
        };

