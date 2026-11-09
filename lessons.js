/* Lee English – built-in lessons. Each lesson: story (8 lines), 3 fills, explain question,
   5 words, grammar, and a 4-turn speaking script. Add new lessons to the end of this list. */
window.LESSONS = [
{
  id: 'bank-oprisk', field: 'BANKING', title: 'Reporting an operational risk incident', storyTitle: 'The missing signature',
  lines: [
    "Every month, Lan's team updates the operational risk log at her bank.",
    "On Thursday, a branch officer reported a problem: a loan contract had been approved without a second signature.",
    "Nobody lost any money, but the mistake broke the bank's four-eyes rule.",
    "Lan asked three questions: what happened, why did it happen, and how can we stop it from happening again?",
    "The officer explained that the system had been down for two hours, so staff had used paper forms.",
    "Lan recorded it as a near miss and added the root cause: there was no backup process for system outages.",
    "In Friday's meeting, she suggested a simple checklist for paper approvals.",
    "Her manager agreed and asked her to share it with every branch by the end of the month."
  ],
  fills: [
    { text: 'The loan contract was approved without a second ______.', ans: ['signature'], line: 1, word: 'signature' },
    { text: 'The system was down for ______ hours.', ans: ['two', '2'], line: 4, word: 'two' },
    { text: 'Lan recorded the incident as a near ______.', ans: ['miss'], line: 5, word: 'miss' }
  ],
  explainQ: 'Why did Lan record it as a near miss, and what was the root cause?', evidence: [2, 5],
  model: 'Lan recorded it as a near miss because the bank did not lose any money. The root cause was that there was no backup process when the system was down.',
  keys: ['No money was lost', 'It broke the four-eyes rule', 'No backup process during outages'],
  words: [
    { en: 'operational risk', ipa: '/ˌɒpəˈreɪʃənl rɪsk/', vi: 'rủi ro hoạt động', def: 'The risk of loss from failed processes, people or systems.', ex: "Lan's team updates the operational risk log." },
    { en: 'near miss', ipa: '/ˌnɪə ˈmɪs/', vi: 'sự cố suýt xảy ra (chưa gây thiệt hại)', def: 'A mistake that could have caused a loss, but did not.', ex: 'Lan recorded it as a near miss.' },
    { en: 'root cause', ipa: '/ˌruːt ˈkɔːz/', vi: 'nguyên nhân gốc rễ', def: 'The main reason a problem happened.', ex: 'The root cause was no backup process.' },
    { en: 'four-eyes rule', ipa: '/ˌfɔːr ˈaɪz ruːl/', vi: 'nguyên tắc hai người kiểm soát', def: 'Two people must check and approve a task.', ex: "The mistake broke the bank's four-eyes rule." },
    { en: 'outage', ipa: '/ˈaʊtɪdʒ/', vi: 'sự cố ngừng hoạt động', def: 'A period when a system is not working.', ex: 'There was no backup process for system outages.' }
  ],
  grammar: {
    title: 'Past perfect passive: had been + past participle',
    why: 'Use it to say what happened BEFORE another past moment – useful when you report an incident.',
    examples: ['A loan contract had been approved without a second signature.', 'The system had been down for two hours.', 'The form had been signed by only one person.'],
    focus: ['had', 'been'],
    qs: [
      { q: 'When the auditor arrived, the report ______.', opts: ['had already been sent', 'has already sent', 'was already sending'], a: 0, why: 'The report was sent before the auditor arrived, by someone else: past perfect passive.' },
      { q: 'By the time IT fixed the system, three loans ______ on paper.', opts: ['are approved', 'had been approved', 'have approved'], a: 1, why: 'The approvals happened earlier, done by someone: had been approved.' }
    ]
  },
  speak: [
    { lee: 'Hi! Can you tell me what happened at the branch on Thursday?', target: 'A loan contract had been approved without a second signature.', vi: 'Một hợp đồng vay đã được duyệt mà không có chữ ký thứ hai.' },
    { lee: 'Did the bank lose any money?', target: 'No, nobody lost any money, so it was a near miss.', vi: 'Không, không ai mất tiền, nên đó là sự cố suýt xảy ra.' },
    { lee: 'What was the root cause?', target: 'There was no backup process when the system was down.', vi: 'Không có quy trình dự phòng khi hệ thống ngừng hoạt động.' },
    { lee: 'How can we stop it from happening again?', target: 'I suggest using a simple checklist for paper approvals.', vi: 'Tôi đề xuất dùng một danh sách kiểm tra đơn giản cho phê duyệt giấy.' }
  ],
  dict: { log: 'sổ ghi chép', branch: 'chi nhánh', officer: 'cán bộ, nhân viên', reported: 'đã báo cáo', loan: 'khoản vay', contract: 'hợp đồng', approved: 'được phê duyệt', signature: 'chữ ký', mistake: 'lỗi', broke: 'đã vi phạm', explained: 'đã giải thích', staff: 'nhân viên', forms: 'biểu mẫu', recorded: 'đã ghi nhận', backup: 'dự phòng', process: 'quy trình', suggested: 'đã đề xuất', checklist: 'danh sách kiểm tra', approvals: 'các phê duyệt', manager: 'quản lý', agreed: 'đã đồng ý' }
},
{
  id: 'bank-loan', field: 'BANKING', title: 'Explaining a home loan to a customer', storyTitle: 'Mr Hùng’s first flat',
  lines: [
    "Mr Hùng visited the bank on Saturday morning because he wanted to buy his first flat.",
    "Trang, a loan officer, asked how much the flat cost and how much he had saved.",
    "The flat cost three billion dong, and he had saved about one billion for the down payment.",
    "Trang explained that the interest rate would be fixed for the first two years.",
    "After that, the rate would change every six months, based on the market.",
    "She showed him a table of monthly repayments for loans of ten, fifteen and twenty years.",
    "Mr Hùng chose fifteen years because the monthly payment fitted his salary.",
    "Before he left, Trang gave him a list of documents to bring, including his labour contract and tax records."
  ],
  fills: [
    { text: 'He had saved about one billion dong for the down ______.', ans: ['payment'], line: 2, word: 'payment' },
    { text: 'The interest rate was fixed for the first ______ years.', ans: ['two', '2'], line: 3, word: 'two' },
    { text: 'Mr Hùng chose a loan of ______ years.', ans: ['fifteen', '15'], line: 6, word: 'fifteen' }
  ],
  explainQ: 'Why did Mr Hùng choose fifteen years, and what happens to the rate after two years?', evidence: [4, 6],
  model: 'He chose fifteen years because the monthly payment fitted his salary. After two years, the interest rate changes every six months, based on the market.',
  keys: ['The monthly payment fitted his salary', 'The rate is fixed for two years', 'Then it changes every six months'],
  words: [
    { en: 'down payment', ipa: '/ˌdaʊn ˈpeɪmənt/', vi: 'khoản trả trước', def: 'The first part of the price you pay yourself.', ex: 'He had saved about one billion for the down payment.' },
    { en: 'interest rate', ipa: '/ˈɪntrəst reɪt/', vi: 'lãi suất', def: 'The percentage you pay to borrow money.', ex: 'The interest rate would be fixed for the first two years.' },
    { en: 'fixed', ipa: '/fɪkst/', vi: 'cố định', def: 'Not changing for a period of time.', ex: 'The rate would be fixed for two years.' },
    { en: 'monthly repayment', ipa: '/ˌmʌnθli rɪˈpeɪmənt/', vi: 'khoản trả nợ hằng tháng', def: 'The money you pay back each month.', ex: 'She showed him a table of monthly repayments.' },
    { en: 'labour contract', ipa: '/ˈleɪbə ˌkɒntrækt/', vi: 'hợp đồng lao động', def: 'A written agreement with your employer.', ex: 'Bring your labour contract and tax records.' }
  ],
  grammar: {
    title: 'First conditional: If + present, will + verb',
    why: 'Use it to explain real results of a choice – perfect for explaining loan options.',
    examples: ['If you choose fifteen years, your monthly payment will be lower.', 'If the market rate rises, your rate will change.', 'If you bring your documents on Monday, we will start the process.'],
    focus: ['if', 'will'],
    qs: [
      { q: 'If you ______ a larger down payment, you will borrow less.', opts: ['will make', 'make', 'made'], a: 1, why: 'After if, use the present simple in the first conditional.' },
      { q: 'If the rate goes up, your repayment ______ higher.', opts: ['will be', 'is being', 'would been'], a: 0, why: 'The result clause uses will + verb.' }
    ]
  },
  speak: [
    { lee: 'Good morning! How can I help you today?', target: 'I would like to apply for a home loan for my first flat.', vi: 'Tôi muốn đăng ký vay mua căn hộ đầu tiên.' },
    { lee: 'How much have you saved for the down payment?', target: 'I have saved about one billion dong.', vi: 'Tôi đã tiết kiệm được khoảng một tỷ đồng.' },
    { lee: 'Would you prefer a ten-year or a fifteen-year loan?', target: 'I prefer fifteen years because the monthly payment is lower.', vi: 'Tôi thích 15 năm vì khoản trả hằng tháng thấp hơn.' },
    { lee: 'Do you have any questions about the interest rate?', target: 'Yes, what will happen to the rate after two years?', vi: 'Có, lãi suất sẽ thế nào sau hai năm?' }
  ],
  dict: { visited: 'đã đến thăm', flat: 'căn hộ', officer: 'cán bộ', cost: 'có giá', saved: 'đã tiết kiệm', billion: 'tỷ', explained: 'đã giải thích', rate: 'lãi suất', market: 'thị trường', table: 'bảng', loans: 'các khoản vay', chose: 'đã chọn', salary: 'lương', documents: 'giấy tờ', including: 'bao gồm', records: 'hồ sơ', tax: 'thuế' }
},
{
  id: 'hr-interview', field: 'HR', title: 'Running a job interview', storyTitle: 'The accountant interview',
  lines: [
    "Linh works in HR at a logistics company and is hiring a senior accountant.",
    "Before the interview, she prepared five questions based on the job description.",
    "She started by asking the candidate, Minh, to describe his current role.",
    "Then she asked, “Can you tell me about a time when you found a mistake in a report?”",
    "Minh explained how he had noticed a payment error and fixed it before the audit.",
    "Linh took notes and scored each answer from one to five.",
    "At the end, she asked Minh if he had any questions about the team.",
    "She thanked him and promised to send feedback within one week."
  ],
  fills: [
    { text: 'Linh prepared ______ questions before the interview.', ans: ['five', '5'], line: 1, word: 'five' },
    { text: 'Minh fixed a payment error before the ______.', ans: ['audit'], line: 4, word: 'audit' },
    { text: 'Linh promised to send feedback within one ______.', ans: ['week'], line: 7, word: 'week' }
  ],
  explainQ: 'How did Linh make the interview fair, and what example did Minh give?', evidence: [1, 5],
  model: 'Linh made it fair by preparing questions from the job description and scoring each answer from one to five. Minh described how he found a payment error and fixed it before the audit.',
  keys: ['Questions based on the job description', 'Each answer scored 1–5', 'Minh fixed a payment error'],
  words: [
    { en: 'job description', ipa: '/ˈdʒɒb dɪˌskrɪpʃn/', vi: 'bản mô tả công việc', def: 'A document that lists the duties of a job.', ex: 'She prepared questions based on the job description.' },
    { en: 'candidate', ipa: '/ˈkændɪdət/', vi: 'ứng viên', def: 'A person applying for a job.', ex: 'She asked the candidate to describe his role.' },
    { en: 'audit', ipa: '/ˈɔːdɪt/', vi: 'cuộc kiểm toán', def: 'An official check of financial records.', ex: 'He fixed it before the audit.' },
    { en: 'take notes', ipa: '/ˌteɪk ˈnəʊts/', vi: 'ghi chép', def: 'To write down important points.', ex: 'Linh took notes during the interview.' },
    { en: 'feedback', ipa: '/ˈfiːdbæk/', vi: 'phản hồi, nhận xét', def: 'Comments about how well someone did.', ex: 'She promised to send feedback within one week.' }
  ],
  grammar: {
    title: 'Present perfect for experience: have + past participle',
    why: 'Interviewers use it to ask about experience at any time up to now.',
    examples: ['Have you ever managed a team?', 'I have worked as an accountant for six years.', 'She has hired three people this year.'],
    focus: ['have', 'has'],
    qs: [
      { q: '______ you ever prepared a tax report?', opts: ['Did', 'Have', 'Are'], a: 1, why: 'Ever + experience up to now: present perfect.' },
      { q: 'I ______ in finance since 2019.', opts: ['have worked', 'work', 'am working'], a: 0, why: 'Since + a starting point needs the present perfect.' }
    ]
  },
  speak: [
    { lee: 'Thanks for coming. Could you describe your current role?', target: 'I am a senior accountant and I manage the monthly reports.', vi: 'Tôi là kế toán trưởng nhóm và quản lý các báo cáo hằng tháng.' },
    { lee: 'Have you ever found a mistake in a report?', target: 'Yes, I have found a payment error before an audit.', vi: 'Có, tôi đã phát hiện một lỗi thanh toán trước đợt kiểm toán.' },
    { lee: 'What did you do next?', target: 'I fixed it and explained the problem to my manager.', vi: 'Tôi sửa nó và giải thích vấn đề cho quản lý.' },
    { lee: 'Do you have any questions for us?', target: 'Yes, could you tell me more about the team?', vi: 'Có, chị có thể nói thêm về đội ngũ không?' }
  ],
  dict: { logistics: 'hậu cần, vận tải', hiring: 'đang tuyển', senior: 'cấp cao', accountant: 'kế toán', prepared: 'đã chuẩn bị', based: 'dựa trên', describe: 'mô tả', current: 'hiện tại', role: 'vai trò', mistake: 'lỗi', report: 'báo cáo', noticed: 'đã nhận ra', payment: 'thanh toán', error: 'lỗi', scored: 'đã chấm điểm', thanked: 'đã cảm ơn', promised: 'đã hứa', within: 'trong vòng' }
},
{
  id: 'hr-no', field: 'HR', title: 'Saying no politely to your manager', storyTitle: 'Too many projects',
  lines: [
    "Mai works in the HR team of an energy company in Ho Chi Minh City.",
    "On Monday, her manager asked her to lead a new training project for forty engineers.",
    "Mai was already preparing the annual performance reviews, which were due in two weeks.",
    "She did not want to refuse directly, because she respected her manager.",
    "So she said she would love to help, but she was worried about the review deadline.",
    "She suggested starting the training project after the reviews were finished.",
    "Her manager thanked her for being honest and agreed to move the start date.",
    "Later, Mai told a colleague that a polite no had protected both projects."
  ],
  fills: [
    { text: 'The training project was for ______ engineers.', ans: ['forty', '40'], line: 1, word: 'forty' },
    { text: 'The reviews were due in ______ weeks.', ans: ['two', '2'], line: 2, word: 'two' },
    { text: 'Her manager agreed to move the start ______.', ans: ['date'], line: 6, word: 'date' }
  ],
  explainQ: 'Why did Mai not refuse directly, and what did she suggest?', evidence: [3, 5],
  model: 'Mai did not refuse directly because she respected her manager. She suggested starting the training project after the performance reviews were finished.',
  keys: ['She respected her manager', 'She was worried about the deadline', 'Start the training after the reviews'],
  words: [
    { en: 'performance review', ipa: '/pəˈfɔːməns rɪˌvjuː/', vi: 'đánh giá hiệu suất', def: 'A meeting to judge how well someone works.', ex: 'Mai was preparing the annual performance reviews.' },
    { en: 'deadline', ipa: '/ˈdedlaɪn/', vi: 'hạn chót', def: 'The latest time to finish something.', ex: 'She was worried about the review deadline.' },
    { en: 'refuse', ipa: '/rɪˈfjuːz/', vi: 'từ chối', def: 'To say no.', ex: 'She did not want to refuse directly.' },
    { en: 'honest', ipa: '/ˈɒnɪst/', vi: 'thành thật', def: 'Telling the truth.', ex: 'Her manager thanked her for being honest.' },
    { en: 'colleague', ipa: '/ˈkɒliːɡ/', vi: 'đồng nghiệp', def: 'A person you work with.', ex: 'Mai told a colleague about it.' }
  ],
  grammar: {
    title: 'suggest + -ing',
    why: 'After “suggest”, use the -ing form (or “that + clause”), never “to + verb”.',
    examples: ['She suggested starting the project later.', 'I suggest moving the meeting to Friday.', 'He suggested asking HR for help.'],
    focus: ['suggested', 'suggest'],
    qs: [
      { q: 'She suggested ______ the training after the reviews.', opts: ['to start', 'starting', 'start'], a: 1, why: 'suggest + -ing.' },
      { q: 'I suggest ______ the deadline with the team.', opts: ['checking', 'to check', 'checked'], a: 0, why: 'suggest + -ing.' }
    ]
  },
  speak: [
    { lee: 'Mai, could you lead the new training project?', target: 'I would love to help, but I am worried about the deadline.', vi: 'Tôi rất muốn giúp, nhưng tôi lo về hạn chót.' },
    { lee: 'What deadline do you mean?', target: 'The performance reviews are due in two weeks.', vi: 'Đợt đánh giá hiệu suất phải xong trong hai tuần.' },
    { lee: 'So what do you suggest?', target: 'I suggest starting the training after the reviews.', vi: 'Tôi đề xuất bắt đầu đào tạo sau đợt đánh giá.' },
    { lee: 'That sounds fair. Thank you for being honest.', target: 'Thank you for understanding.', vi: 'Cảm ơn anh đã thông cảm.' }
  ],
  dict: { energy: 'năng lượng', lead: 'dẫn dắt', training: 'đào tạo', engineers: 'kỹ sư', preparing: 'đang chuẩn bị', annual: 'hằng năm', due: 'đến hạn', directly: 'thẳng thắn, trực tiếp', respected: 'tôn trọng', worried: 'lo lắng', suggested: 'đã đề xuất', finished: 'hoàn thành', agreed: 'đã đồng ý', polite: 'lịch sự', protected: 'đã bảo vệ' }
},
{
  id: 're-viewing', field: 'REAL ESTATE', title: 'Showing an apartment to a client', storyTitle: 'A flat with a river view',
  lines: [
    "Nam is a property agent, and on Sunday he showed a two-bedroom flat to Emma and Tom.",
    "The couple had just moved to Da Nang for work and wanted something close to the beach.",
    "Nam pointed out that the living room was bigger than in most flats in the building.",
    "He also showed them the balcony, which had a view of the river.",
    "Emma asked about the management fee, and Nam said it was twelve dollars a month.",
    "Tom was worried about noise, so Nam opened the windows to show how quiet the street was.",
    "The rent included furniture, but the tenants would pay for electricity and water.",
    "Before leaving, they asked Nam to send them a copy of the lease agreement."
  ],
  fills: [
    { text: 'Nam showed them a ______-bedroom flat.', ans: ['two', '2'], line: 0, word: 'two' },
    { text: 'The balcony had a view of the ______.', ans: ['river'], line: 3, word: 'river' },
    { text: 'The management fee was ______ dollars a month.', ans: ['twelve', '12'], line: 4, word: 'twelve' }
  ],
  explainQ: 'What was Tom worried about, and how did Nam respond?', evidence: [5],
  model: 'Tom was worried about noise. Nam opened the windows to show them how quiet the street was.',
  keys: ['Tom was worried about noise', 'Nam opened the windows', 'The street was quiet'],
  words: [
    { en: 'property agent', ipa: '/ˈprɒpəti ˌeɪdʒənt/', vi: 'môi giới bất động sản', def: 'A person who helps people rent or buy homes.', ex: 'Nam is a property agent.' },
    { en: 'management fee', ipa: '/ˈmænɪdʒmənt fiː/', vi: 'phí quản lý', def: 'Money paid for running a building.', ex: 'The management fee was twelve dollars a month.' },
    { en: 'furniture', ipa: '/ˈfɜːnɪtʃə/', vi: 'đồ nội thất', def: 'Tables, chairs, beds and similar things.', ex: 'The rent included furniture.' },
    { en: 'tenant', ipa: '/ˈtenənt/', vi: 'người thuê', def: 'A person who pays rent to live somewhere.', ex: 'The tenants would pay for electricity.' },
    { en: 'lease agreement', ipa: '/ˈliːs əˌɡriːmənt/', vi: 'hợp đồng thuê', def: 'A contract for renting a property.', ex: 'Send them a copy of the lease agreement.' }
  ],
  grammar: {
    title: 'Comparatives: bigger than / more convenient than',
    why: 'Agents compare places all the time. Short adjectives add -er; long ones use more.',
    examples: ['The living room was bigger than in most flats.', 'This street is quieter than the main road.', 'The second flat is more convenient for the beach.'],
    focus: ['bigger', 'quieter', 'more', 'than'],
    qs: [
      { q: 'This flat is ______ than the one we saw yesterday.', opts: ['more cheap', 'cheaper', 'cheapest'], a: 1, why: 'Short adjective: cheap → cheaper.' },
      { q: 'The new building is ______ than the old one.', opts: ['modern', 'more modern', 'moderner'], a: 1, why: 'Two-syllable “modern” usually takes more.' }
    ]
  },
  speak: [
    { lee: 'Welcome! This is the living room. What do you think?', target: 'It is bigger than I expected, and very bright.', vi: 'Nó rộng hơn tôi nghĩ, và rất sáng.' },
    { lee: 'Do you have any questions about the costs?', target: 'How much is the management fee each month?', vi: 'Phí quản lý mỗi tháng là bao nhiêu?' },
    { lee: 'It is twelve dollars. Anything else?', target: 'Is the street quiet at night?', vi: 'Con phố có yên tĩnh vào ban đêm không?' },
    { lee: 'Yes, it is very quiet. Would you like the lease agreement?', target: 'Yes, please send us a copy of the lease agreement.', vi: 'Vâng, vui lòng gửi chúng tôi một bản hợp đồng thuê.' }
  ],
  dict: { showed: 'đã cho xem', couple: 'cặp vợ chồng', moved: 'đã chuyển đến', close: 'gần', beach: 'bãi biển', pointed: 'chỉ ra', building: 'tòa nhà', balcony: 'ban công', view: 'tầm nhìn', river: 'sông', worried: 'lo lắng', noise: 'tiếng ồn', quiet: 'yên tĩnh', rent: 'tiền thuê', included: 'đã bao gồm', electricity: 'điện', copy: 'bản sao' }
},
{
  id: 're-negotiate', field: 'REAL ESTATE', title: 'Negotiating office rent', storyTitle: 'Three months free',
  lines: [
    "Hà manages facilities for a tech company that needs a bigger office in Hanoi.",
    "She found a good floor in a new building, but the rent was higher than her budget.",
    "In the meeting with the landlord, she started by saying how much she liked the space.",
    "Then she asked, “Would it be possible to have the first three months rent-free?”",
    "The landlord said he could offer one month free if she signed a five-year lease.",
    "Hà explained that her company preferred a three-year lease with an option to renew.",
    "After some discussion, they agreed on two free months and a three-year lease.",
    "Hà was pleased because the deal saved her company almost twenty thousand dollars."
  ],
  fills: [
    { text: 'Hà asked for the first ______ months rent-free.', ans: ['three', '3'], line: 3, word: 'three' },
    { text: 'The landlord wanted a ______-year lease.', ans: ['five', '5'], line: 4, word: 'five' },
    { text: 'In the end, they agreed on ______ free months.', ans: ['two', '2'], line: 6, word: 'two' }
  ],
  explainQ: 'How did Hà start the negotiation, and what was the final deal?', evidence: [2, 6],
  model: 'Hà started by telling the landlord how much she liked the space. In the end, they agreed on two free months and a three-year lease.',
  keys: ['She started with a positive comment', 'Two months rent-free', 'A three-year lease'],
  words: [
    { en: 'landlord', ipa: '/ˈlændlɔːd/', vi: 'chủ nhà, bên cho thuê', def: 'A person who rents a property to others.', ex: 'In the meeting with the landlord, she was polite.' },
    { en: 'budget', ipa: '/ˈbʌdʒɪt/', vi: 'ngân sách', def: 'The money you plan to spend.', ex: 'The rent was higher than her budget.' },
    { en: 'rent-free', ipa: '/ˌrent ˈfriː/', vi: 'miễn tiền thuê', def: 'With no rent to pay for a time.', ex: 'Could we have the first three months rent-free?' },
    { en: 'renew', ipa: '/rɪˈnjuː/', vi: 'gia hạn', def: 'To continue a contract for another period.', ex: 'A three-year lease with an option to renew.' },
    { en: 'deal', ipa: '/diːl/', vi: 'thỏa thuận', def: 'An agreement between two sides.', ex: 'The deal saved her company money.' }
  ],
  grammar: {
    title: 'Polite requests: Would it be possible to…? / Could you…?',
    why: 'Soft questions make negotiation friendlier and more professional than direct demands.',
    examples: ['Would it be possible to have the first three months rent-free?', 'Could you lower the rent a little?', 'Would you consider a three-year lease?'],
    focus: ['would', 'could', 'possible'],
    qs: [
      { q: '______ it be possible to start in May?', opts: ['Would', 'Will', 'Do'], a: 0, why: 'Would it be possible to…? is the polite form.' },
      { q: 'Could you ______ the price a little?', opts: ['to reduce', 'reducing', 'reduce'], a: 2, why: 'Could you + base verb.' }
    ]
  },
  speak: [
    { lee: 'So, what do you think of the space?', target: 'We really like the space and the location.', vi: 'Chúng tôi rất thích không gian và vị trí.' },
    { lee: 'Great. The rent is fixed for the first year.', target: 'Would it be possible to have three months rent-free?', vi: 'Có thể miễn tiền thuê ba tháng đầu không?' },
    { lee: 'I can offer one month if you sign for five years.', target: 'We would prefer a three-year lease with an option to renew.', vi: 'Chúng tôi muốn hợp đồng ba năm có quyền gia hạn.' },
    { lee: 'All right. Two free months and three years?', target: 'That sounds fair. We have a deal.', vi: 'Nghe hợp lý. Chúng ta thỏa thuận vậy nhé.' }
  ],
  dict: { manages: 'quản lý', facilities: 'cơ sở vật chất', tech: 'công nghệ', floor: 'tầng', meeting: 'cuộc họp', space: 'không gian', offer: 'đề nghị', signed: 'đã ký', lease: 'hợp đồng thuê', explained: 'đã giải thích', preferred: 'ưa thích hơn', option: 'quyền chọn', discussion: 'thảo luận', agreed: 'đã đồng ý', pleased: 'hài lòng', saved: 'đã tiết kiệm', thousand: 'nghìn' }
},
{
  id: 'en-solar', field: 'ENERGY', title: 'Presenting a rooftop solar project', storyTitle: 'Sunlight on the factory roof',
  lines: [
    "An is an engineer at a solar company, and last week she presented a project to a shoe factory.",
    "The factory used a lot of electricity, especially in the hot afternoons.",
    "An proposed a rooftop system with a capacity of one megawatt.",
    "She explained that the panels are installed on the roof and connected to the factory's power system.",
    "The system would produce about a quarter of the electricity the factory needed.",
    "The director asked how long it would take to get the money back.",
    "An said the payback period was about six years, and the panels would last for twenty-five years.",
    "The director liked the plan and asked for a detailed proposal by Friday."
  ],
  fills: [
    { text: 'The system had a capacity of one ______.', ans: ['megawatt', 'mw'], line: 2, word: 'megawatt' },
    { text: 'The payback period was about ______ years.', ans: ['six', '6'], line: 6, word: 'six' },
    { text: 'The director asked for a detailed proposal by ______.', ans: ['friday'], line: 7, word: 'Friday' }
  ],
  explainQ: 'Why is solar useful for this factory, and how much electricity would it provide?', evidence: [1, 4],
  model: 'Solar is useful because the factory uses a lot of electricity, especially in the hot afternoons. The system would produce about a quarter of the electricity it needs.',
  keys: ['High use in hot afternoons', 'About a quarter of its electricity', 'Payback in about six years'],
  words: [
    { en: 'capacity', ipa: '/kəˈpæsəti/', vi: 'công suất', def: 'The most a system can produce.', ex: 'A rooftop system with a capacity of one megawatt.' },
    { en: 'panel', ipa: '/ˈpænl/', vi: 'tấm pin', def: 'A flat piece that collects sunlight.', ex: 'The panels are installed on the roof.' },
    { en: 'install', ipa: '/ɪnˈstɔːl/', vi: 'lắp đặt', def: 'To put equipment in place and make it work.', ex: 'The panels are installed on the roof.' },
    { en: 'payback period', ipa: '/ˈpeɪbæk ˌpɪəriəd/', vi: 'thời gian hoàn vốn', def: 'The time needed to earn back the cost.', ex: 'The payback period was about six years.' },
    { en: 'proposal', ipa: '/prəˈpəʊzl/', vi: 'bản đề xuất', def: 'A written plan offered for approval.', ex: 'He asked for a detailed proposal by Friday.' }
  ],
  grammar: {
    title: 'Present simple passive: is/are + past participle',
    why: 'Use it to describe how a system works when the action matters more than who does it.',
    examples: ['The panels are installed on the roof.', 'The electricity is used by the factory.', 'The system is checked every six months.'],
    focus: ['are', 'is'],
    qs: [
      { q: 'The panels ______ every year.', opts: ['are cleaned', 'clean', 'are cleaning'], a: 0, why: 'Someone cleans them: are + past participle.' },
      { q: 'Most of the power ______ during the day.', opts: ['produces', 'is produced', 'is producing'], a: 1, why: 'The power does not produce itself: passive.' }
    ]
  },
  speak: [
    { lee: 'Thanks for coming. What are you proposing for our factory?', target: 'We propose a rooftop solar system of one megawatt.', vi: 'Chúng tôi đề xuất hệ thống điện mặt trời áp mái công suất một megawatt.' },
    { lee: 'How does it work?', target: 'The panels are installed on the roof and connected to your power system.', vi: 'Các tấm pin được lắp trên mái và nối với hệ thống điện của nhà máy.' },
    { lee: 'How long until we get our money back?', target: 'The payback period is about six years.', vi: 'Thời gian hoàn vốn khoảng sáu năm.' },
    { lee: 'Sounds good. What is the next step?', target: 'We will send you a detailed proposal by Friday.', vi: 'Chúng tôi sẽ gửi bản đề xuất chi tiết trước thứ Sáu.' }
  ],
  dict: { engineer: 'kỹ sư', solar: 'năng lượng mặt trời', presented: 'đã trình bày', factory: 'nhà máy', electricity: 'điện', especially: 'đặc biệt', proposed: 'đã đề xuất', rooftop: 'áp mái', system: 'hệ thống', connected: 'được kết nối', produce: 'sản xuất', quarter: 'một phần tư', director: 'giám đốc', last: 'kéo dài', detailed: 'chi tiết' }
},
{
  id: 'en-grid', field: 'ENERGY', title: 'Reporting a project delay', storyTitle: 'Waiting for the grid',
  lines: [
    "Quân is the project manager for a wind farm in Ninh Thuận.",
    "The turbines were ready, but the farm could not sell electricity yet.",
    "The delay was due to a problem with the new substation that connects the farm to the grid.",
    "A key transformer had arrived late because of bad weather at the port.",
    "In the weekly meeting, Quân explained the situation clearly and calmly.",
    "He said the grid connection would now happen in March instead of January.",
    "To reduce the loss, the team planned to test each turbine while they waited.",
    "The investors were not happy, but they thanked Quân for giving them the facts early."
  ],
  fills: [
    { text: 'A key ______ arrived late.', ans: ['transformer'], line: 3, word: 'transformer' },
    { text: 'The grid connection moved to ______.', ans: ['march'], line: 5, word: 'March' },
    { text: 'The team planned to test each ______ while waiting.', ans: ['turbine'], line: 6, word: 'turbine' }
  ],
  explainQ: 'What caused the delay, and what did the team do to reduce the loss?', evidence: [2, 6],
  model: 'The delay was caused by a problem with the new substation, because a transformer arrived late. To reduce the loss, the team tested each turbine while they waited.',
  keys: ['Substation problem', 'The transformer arrived late', 'Testing turbines while waiting'],
  words: [
    { en: 'wind farm', ipa: '/ˈwɪnd fɑːm/', vi: 'trang trại điện gió', def: 'A group of wind turbines that make electricity.', ex: 'Quân manages a wind farm.' },
    { en: 'grid', ipa: '/ɡrɪd/', vi: 'lưới điện', def: 'The network that carries electricity.', ex: 'The substation connects the farm to the grid.' },
    { en: 'substation', ipa: '/ˈsʌbsteɪʃn/', vi: 'trạm biến áp', def: 'A place that changes the voltage of electricity.', ex: 'There was a problem with the new substation.' },
    { en: 'delay', ipa: '/dɪˈleɪ/', vi: 'sự chậm trễ', def: 'A situation where something happens later than planned.', ex: 'The delay was due to the substation.' },
    { en: 'investor', ipa: '/ɪnˈvestə/', vi: 'nhà đầu tư', def: 'A person who puts money into a project.', ex: 'The investors thanked Quân.' }
  ],
  grammar: {
    title: 'due to / because of + noun vs because + clause',
    why: 'Use these to explain reasons in reports. Noun after due to/because of; subject + verb after because.',
    examples: ['The delay was due to a problem with the substation.', 'The transformer arrived late because of bad weather.', 'The farm could not sell electricity because the grid was not ready.'],
    focus: ['due', 'because'],
    qs: [
      { q: 'The meeting was cancelled ______ the storm.', opts: ['because', 'because of', 'due'], a: 1, why: 'A noun (the storm) follows because of.' },
      { q: 'We are late ______ the parts arrived late.', opts: ['because', 'due to', 'because of'], a: 0, why: 'A clause (the parts arrived) follows because.' }
    ]
  },
  speak: [
    { lee: 'Quân, can you update us on the wind farm?', target: 'The turbines are ready, but we cannot sell electricity yet.', vi: 'Các tua-bin đã sẵn sàng, nhưng chúng ta chưa bán điện được.' },
    { lee: 'Why not?', target: 'The delay is due to a problem with the new substation.', vi: 'Sự chậm trễ là do vấn đề ở trạm biến áp mới.' },
    { lee: 'When will we be connected?', target: 'The grid connection will happen in March instead of January.', vi: 'Việc đấu nối lưới sẽ diễn ra vào tháng Ba thay vì tháng Một.' },
    { lee: 'What are you doing in the meantime?', target: 'We are testing each turbine to reduce the loss.', vi: 'Chúng tôi đang thử từng tua-bin để giảm thiệt hại.' }
  ],
  dict: { project: 'dự án', manager: 'quản lý', turbines: 'tua-bin', turbine: 'tua-bin', ready: 'sẵn sàng', electricity: 'điện', connects: 'kết nối', transformer: 'máy biến áp', arrived: 'đã đến', weather: 'thời tiết', port: 'cảng', weekly: 'hằng tuần', situation: 'tình hình', clearly: 'rõ ràng', calmly: 'bình tĩnh', connection: 'sự đấu nối', instead: 'thay vì', reduce: 'giảm', loss: 'thiệt hại', investors: 'nhà đầu tư', facts: 'sự thật, dữ kiện', early: 'sớm' }
}
];
