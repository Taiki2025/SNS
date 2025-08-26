// DOM要素の取得
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const messageInput = document.getElementById('message-input');
const messageContainer = document.querySelector('.message-container');

// メッセージ送信機能
function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;

    // 送信メッセージを追加
    addMessage(message, 'sent');
    messageInput.value = '';

    // 自動返信（シミュレーション）
    setTimeout(() => {
        const autoReplies = [
            'ありがとうございます。ご質問の内容を確認いたしました。',
            '承知いたしました。担当者におつなぎいたします。',
            'お手伝いできることがございましたら、お気軽にお声かけください。',
            'ご不明な点がございましたら、メニューからお選びください。'
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        addMessage(randomReply, 'received');
    }, 1000);
}

// メッセージを追加する関数
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const currentTime = new Date().toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    if (type === 'received') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMDY2Y2MiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMkMxMy4xIDIgMTQgMi45IDE0IDRWNkgxOEMxOS4xIDYgMjAgNi45IDIwIDhWMTZDMjAgMTcuMSAxOS4xIDE4IDE4IDE4SDZWMjBIMThDMjAuMiAyMCAyMiAxOC4yIDIyIDE2VjRDMjIgMS44IDIwLjIgMCAxOCAwSDRDMS44IDAgMCAxLjggMCA0VjE2QzAgMTguMiAxLjggMjAgNCAyMEg2VjE4SDRWNEg0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="九州電力">
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
    }

    messageContainer.appendChild(messageDiv);
    
    // メッセージエリアを最下部にスクロール
    const messageArea = document.querySelector('.message-area');
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Enterキーでメッセージ送信
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// サービス詳細を開く関数
function openService(serviceType) {
    const serviceData = getServiceData(serviceType);
    modalTitle.textContent = serviceData.title;
    modalBody.innerHTML = serviceData.content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// モーダルを閉じる関数
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// モーダル外クリックで閉じる
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// サービスデータの定義
function getServiceData(serviceType) {
    const services = {
        moving: {
            title: '引越し手続き',
            content: `
                <div class="form-group">
                    <label for="current-address">現在の住所</label>
                    <input type="text" id="current-address" placeholder="現在の住所を入力してください">
                </div>
                <div class="form-group">
                    <label for="new-address">引越し先住所</label>
                    <input type="text" id="new-address" placeholder="引越し先の住所を入力してください">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="customer-name">お客様氏名</label>
                        <input type="text" id="customer-name" placeholder="氏名を入力してください">
                    </div>
                    <div class="form-group">
                        <label for="contract-number">契約番号</label>
                        <input type="text" id="contract-number" placeholder="契約番号を入力してください">
                    </div>
                </div>
                <div class="form-group">
                    <label for="moving-date">引越し希望日</label>
                    <input type="date" id="moving-date">
                </div>
                <div class="form-group">
                    <label for="contact-phone">連絡先電話番号</label>
                    <input type="tel" id="contact-phone" placeholder="電話番号を入力してください">
                </div>
                <div class="form-group">
                    <label for="notes">備考</label>
                    <textarea id="notes" rows="4" placeholder="その他ご要望があればご記入ください"></textarea>
                </div>
                <button class="btn-primary" onclick="submitMovingForm()">申し込みを送信</button>
            `
        },
        payment: {
            title: 'お支払方法変更',
            content: `
                <div class="billing-info">
                    <h4>現在の支払方法</h4>
                    <p>口座振替（○○銀行 普通 1234567）</p>
                </div>
                <div class="form-group">
                    <label>変更したい支払方法を選択してください</label>
                    <div style="margin-top: 16px;">
                        <label style="display: flex; align-items: center; margin-bottom: 12px;">
                            <input type="radio" name="payment-method" value="credit-card" style="margin-right: 8px;">
                            クレジットカード
                        </label>
                        <label style="display: flex; align-items: center; margin-bottom: 12px;">
                            <input type="radio" name="payment-method" value="bank-transfer" style="margin-right: 8px;">
                            口座振替（別の口座）
                        </label>
                        <label style="display: flex; align-items: center;">
                            <input type="radio" name="payment-method" value="convenience-store" style="margin-right: 8px;">
                            コンビニ払い
                        </label>
                    </div>
                </div>
                <div id="credit-card-form" style="display: none;">
                    <div class="form-group">
                        <label for="card-number">カード番号</label>
                        <input type="text" id="card-number" placeholder="1234 5678 9012 3456">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiry-date">有効期限</label>
                            <input type="text" id="expiry-date" placeholder="MM/YY">
                        </div>
                        <div class="form-group">
                            <label for="cvv">セキュリティコード</label>
                            <input type="text" id="cvv" placeholder="123">
                        </div>
                    </div>
                </div>
                <div id="bank-transfer-form" style="display: none;">
                    <div class="form-group">
                        <label for="bank-name">銀行名</label>
                        <input type="text" id="bank-name" placeholder="銀行名を入力してください">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="account-type">口座種別</label>
                            <select id="account-type">
                                <option value="">選択してください</option>
                                <option value="ordinary">普通</option>
                                <option value="checking">当座</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="account-number">口座番号</label>
                            <input type="text" id="account-number" placeholder="口座番号を入力してください">
                        </div>
                    </div>
                </div>
                <button class="btn-primary" onclick="submitPaymentForm()">変更内容を確認</button>
            `
        },
        billing: {
            title: '電気料金確認',
            content: `
                <div class="billing-info">
                    <h4>契約情報</h4>
                    <p>契約番号：1234567890</p>
                    <p>プラン名：従量電灯B</p>
                </div>
                <div class="billing-info">
                    <h4>当月料金（2024年3月）</h4>
                    <div class="billing-details">
                        <div class="billing-item">
                            <div class="value">¥8,450</div>
                            <div class="label">料金</div>
                        </div>
                        <div class="billing-item">
                            <div class="value">320 kWh</div>
                            <div class="label">使用量</div>
                        </div>
                        <div class="billing-item">
                            <div class="value">¥26.41</div>
                            <div class="label">単価</div>
                        </div>
                    </div>
                </div>
                <div class="billing-info">
                    <h4>過去6ヶ月の使用量推移</h4>
                    <div style="height: 200px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                        グラフ表示エリア<br>
                        （実際の実装ではChart.js等を使用）
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <button class="btn-primary" onclick="downloadBill()">料金明細書をダウンロード</button>
                </div>
            `
        },
        applications: {
            title: '各種お申込み',
            content: `
                <div style="display: grid; gap: 16px;">
                    <div class="service-card" style="padding: 20px; text-align: left;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="background: #ff6b35; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-solar-panel"></i>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 8px;">太陽光売電申し込み</h4>
                                <p style="color: #666; font-size: 14px;">余剰電力の売電サービスに申し込み</p>
                            </div>
                        </div>
                        <button class="btn-primary" style="margin-top: 16px;">申し込む</button>
                    </div>
                    
                    <div class="service-card" style="padding: 20px; text-align: left;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="background: #00a0e9; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 8px;">オプションサービス</h4>
                                <p style="color: #666; font-size: 14px;">各種オプションサービスの申し込み</p>
                            </div>
                        </div>
                        <button class="btn-primary" style="margin-top: 16px;">申し込む</button>
                    </div>
                    
                    <div class="service-card" style="padding: 20px; text-align: left;">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="background: #28a745; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-leaf"></i>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 8px;">省エネ診断</h4>
                                <p style="color: #666; font-size: 14px;">お客様の使用状況に合わせた省エネ提案</p>
                            </div>
                        </div>
                        <button class="btn-primary" style="margin-top: 16px;">申し込む</button>
                    </div>
                </div>
            `
        },
        contract: {
            title: '契約内容確認',
            content: `
                <div class="billing-info">
                    <h4>基本情報</h4>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <span style="font-weight: 500;">お客様番号</span>
                            <span>1234567890</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <span style="font-weight: 500;">契約者名</span>
                            <span>山田 太郎</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <span style="font-weight: 500;">供給地点特定番号</span>
                            <span>1234567890123456</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <span style="font-weight: 500;">契約プラン</span>
                            <span>従量電灯B</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <span style="font-weight: 500;">契約容量</span>
                            <span>30A</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span style="font-weight: 500;">供給開始日</span>
                            <span>2020年4月1日</span>
                        </div>
                    </div>
                </div>
                <div class="billing-info">
                    <h4>連絡先情報</h4>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <span style="font-weight: 500;">住所</span>
                            <span>福岡県福岡市博多区○○○○</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <span style="font-weight: 500;">電話番号</span>
                            <span>092-123-4567</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
                            <span style="font-weight: 500;">メールアドレス</span>
                            <span>yamada@example.com</span>
                        </div>
                    </div>
                </div>
                <button class="btn-primary" onclick="updateContactInfo()">連絡先情報を変更</button>
            `
        },
        faq: {
            title: 'よくあるご質問',
            content: `
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        <span>電気料金の支払い方法を変更したい</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        お支払い方法の変更は、お客様番号とご本人確認書類が必要です。Webからも変更手続きが可能です。詳しくは「お支払方法変更」サービスをご利用ください。
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        <span>引越しの際の手続きについて</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        引越しの際は、現在の契約の解約手続きと新住所での新規契約手続きが必要です。引越し予定日の1ヶ月前までにお手続きください。
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        <span>停電が発生した場合の対処法</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        停電が発生した場合は、まずブレーカーを確認してください。ブレーカーが落ちている場合は復旧させてください。それでも復旧しない場合は、お客様センターまでご連絡ください。
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        <span>電気料金の計算方法について</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        電気料金は基本料金と従量料金の合計で計算されます。基本料金は契約容量により決まり、従量料金は使用電力量に応じて段階的に計算されます。
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question" onclick="toggleFaq(this)">
                        <span>太陽光発電の売電について</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        太陽光発電で発電した電気のうち、ご家庭で使用せずに余った電気を電力会社に売ることができます。売電価格は固定価格買取制度により決まります。
                    </div>
                </div>
            `
        }
    };
    
    return services[serviceType] || { title: 'サービス詳細', content: '<p>サービス情報を読み込み中...</p>' };
}

// FAQの開閉機能
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    } else {
        answer.classList.add('active');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }
}

// 支払方法変更フォームの動的表示
document.addEventListener('change', (e) => {
    if (e.target.name === 'payment-method') {
        const creditCardForm = document.getElementById('credit-card-form');
        const bankTransferForm = document.getElementById('bank-transfer-form');
        
        if (e.target.value === 'credit-card') {
            creditCardForm.style.display = 'block';
            bankTransferForm.style.display = 'none';
        } else if (e.target.value === 'bank-transfer') {
            creditCardForm.style.display = 'none';
            bankTransferForm.style.display = 'block';
        } else {
            creditCardForm.style.display = 'none';
            bankTransferForm.style.display = 'none';
        }
    }
});

// フォーム送信関数（サンプル）
function submitMovingForm() {
    alert('引越し手続きの申し込みを受け付けました。確認メールをお送りします。');
    closeModal();
}

function submitPaymentForm() {
    alert('支払方法の変更を受け付けました。変更内容の確認メールをお送りします。');
    closeModal();
}

function downloadBill() {
    alert('料金明細書のダウンロードを開始します。');
}

function updateContactInfo() {
    alert('連絡先情報の変更画面に移動します。');
    closeModal();
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('九州電力LINE風Webサービスが読み込まれました');
    
    // メッセージエリアを最下部にスクロール
    const messageArea = document.querySelector('.message-area');
    messageArea.scrollTop = messageArea.scrollHeight;
});
