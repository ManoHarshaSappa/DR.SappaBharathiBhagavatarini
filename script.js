const HEADER_SELECTOR = ".site-header";
const INITIAL_RENDER_COUNT = 4;
const RENDER_STEP = 4;

// TODO: Replace this with API data
const SECTION_DATA = {
  harikatha: [
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/శ్రీమతి రావు కమల కుమారి భాగవతారిణి.png", title: "శ్రీమతి రావు కమల కుమారి భాగవతారిణి", subtitle: "Mrs. Rao Kamala Kumari Bhagavatarini Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/పద్మశ్రీ కోట సచ్చిదానంద శాస్త్రి భాగవతులు.png", title: "పద్మశ్రీ కోట సచ్చిదానంద శాస్త్రి భాగవతులు", subtitle: "Padmasree Kota Sachidananda Sastri Bhagavathulu Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/బ్రహ్మశ్రీ కొమ్ము సుబ్రమణ్య వరప్రసాద్ భాగవతులు.png", title: "బ్రహ్మశ్రీ కొమ్ము సుబ్రమణ్య వరప్రసాద్ భాగవతులు", subtitle: "Brahmashree Kommu Subramanya Varaprasad Bhagavathulu Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/శ్రీమతి విన్నకోట రామకుమారి భాగవతారిణి.png", title: "శ్రీమతి విన్నకోట రామకుమారి భాగవతారిణి", subtitle: "Mrs. Winnakota Ramakumari Bhagavatarini Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/బ్రహ్మశ్రీ తూములూరి లక్ష్మణ  శాస్త్రి భాగవతులు.png", title: "బ్రహ్మశ్రీ తూములూరి లక్ష్మణ శాస్త్రి భాగవతులు", subtitle: "Brahmashree Tumuluri Lakshmana Shastri Bhagavathulu Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/బ్రహ్మశ్రీ బుర్ర శివరామకృష్ణ శర్మ భాగవతులు.png", title: "బ్రహ్మశ్రీ బుర్ర శివరామకృష్ణ శర్మ భాగవతులు", subtitle: "Brahmashree Burra Sivaramakrishna Sharma Bhagavathulu Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/బ్రహ్మశ్రీ ముప్పవరపు సింహాచల శాస్త్రి భాగవతులు.png", title: "బ్రహ్మశ్రీ ముప్పవరపు సింహాచల శాస్త్రి భాగవతులు", subtitle: "Brahmashree Muppavarapu Simhachala Sastri Bhagavathulu Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/శ్రీ వై వెంకటేశ్వర్లు భాగవతులు తిరుపతి శ్రీ వెంకటేశ్వర విశ్వవిద్యాలయం.png", title: "శ్రీ వై వెంకటేశ్వర్లు భాగవతులు", subtitle: "Sri Y. Venkateswarlu Bhagavathulu Garu" },
    { image: "Sangeetha Vibhagamulu/Famous Harikatha Artists/శ్రీమతి జయంతి సావిత్రి భాగవతారిణి.png", title: "శ్రీమతి జయంతి సావిత్రి భాగవతారిణి", subtitle: "Mrs. Jayanthi Savitri Bhagavatarini Garu" }
  ],
  music: [
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/పద్మ విభూషణ్, డాక్టర్ మంగళంపల్లి బాలమురళీకృష్ణ గారు..png", title: "పద్మ విభూషణ్ డాక్టర్ మంగళంపల్లి బాలమురళీకృష్ణ గారు", subtitle: "Padma Vibhushan Dr. Mangalampalli Balamuralikrishna Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/పద్మశ్రీ అన్నవరపు రామస్వామి గారు.png", title: "పద్మశ్రీ అన్నవరపు రామస్వామి గారు", subtitle: "Padma Shri Annavarapu Ramaswamy Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/పద్మశ్రీ A కన్యాకుమారి గారు.png", title: "పద్మశ్రీ ఏ. కన్యాకుమారి గారు", subtitle: "Padma Shri A. Kanyakumari Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/పద్మశ్రీ ఎల్లా వెంకటేశ్వరరావు గారు.png", title: "పద్మశ్రీ ఎల్లా వెంకటేశ్వరరావు గారు", subtitle: "Padma Shri Ella Venkateswara Rao Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/గౌరవనీయులు శ్రీ పత్రి సతీష్ కుమార్ గారు.png", title: "గౌరవనీయులు శ్రీ పత్రి సతీష్ కుమార్ గారు", subtitle: "Shri Patri Satish Kumar Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/పద్మశ్రీ దండమూడి సుమతి గారు.png", title: "పద్మశ్రీ దండమూడి సుమతి గారు", subtitle: "Padma Shri Dandamudi Sumathi Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/శ్రీ గరిమెళ్ళ బాలకృష్ణ ప్రసాద్ గారు.png", title: "శ్రీ గరిమెళ్ళ బాలకృష్ణ ప్రసాద్ గారు", subtitle: "Shri Garimella Balakrishna Prasad Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/శ్రీమాన్ నల్లాన్ చక్రవర్తుల కృష్ణమాచార్యులు గారు.png", title: "శ్రీమాన్ నల్లాన్ చక్రవర్తుల కృష్ణమాచార్యులు గారు", subtitle: "Shriman Nallan Chakravartula Krishnamacharyulu Garu" },
    { image: "Sangeetha Vibhagamulu/Musical Instrument Players/బ్రహ్మశ్రీ మావుడూరి సత్యనారాయణ శర్మ గారు అండ్ బ్రదర్స్.png", title: "బ్రహ్మశ్రీ మావుడూరి సత్యనారాయణ శర్మ గారు అండ్ బ్రదర్స్", subtitle: "Brahmashree Mavuduri Satyanarayana Sharma Garu and Brothers" }
  ],
  rangasthala: [
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/శ్రీ గుమ్మడి గోపాలకృష్ణ గారు.png", title: "శ్రీ గుమ్మడి గోపాలకృష్ణ గారు", subtitle: "Shri Gummadi Gopalakrishna Garu" },
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/శ్రీ జే కే విజయ్ కుమార్ గారు.png", title: "శ్రీ జే కె విజయ్ కుమార్ గారు", subtitle: "Shri J. K. Vijay Kumar Garu" },
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/శ్రీ నాయుడు గోపి గారు.png", title: "శ్రీ నాయుడు గోపి గారు", subtitle: "Shri Naidu Gopi Garu" },
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/శ్రీ మల్లాడి శివ నారాయణ గారు.png", title: "శ్రీ మల్లాడి శివ నారాయణ గారు", subtitle: "Shri Malladi Siva Narayana Garu" },
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/శ్రీ షణ్ముఖి విజయ్ కుమార్ రాజు గారు.png", title: "శ్రీ షణ్ముఖి విజయ్ కుమార్ రాజు గారు", subtitle: "Shri Shanmukhi Vijay Kumar Raju Garu" },
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/శ్రీమతి రత్నశ్రీ గారు.png", title: "శ్రీమతి రత్నశ్రీ గారు", subtitle: "Smt. Ratnashri Garu" },
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/దివిసీమ రంగస్థల కళాకారుల సంఘం అధ్యక్షులు కీర్తిశేషులు అడ్డాడ దుర్గా నాగేశ్వరరావు గారు.png", title: "దివిసీమ రంగస్థల కళాకారుల సంఘం అధ్యక్షులు కీర్తిశేషులు అడ్డాడ దుర్గా నాగేశ్వరరావు గారు", subtitle: "Late Addada Durga Nageswara Rao Garu – President, Diviseema Rangasthala Artists Association" },
    { image: "Sangeetha Vibhagamulu/Rangastalam (Stage) Artists/శ్రీ ఎస్ కే మిశ్రో గారు.png", title: "శ్రీ ఎస్ కె మిశ్రో గారు", subtitle: "Shri S. K. Mishra Garu" }
  ],
  politicians: [
    { image: "Pramukhalu/Politicians & Leaders/ఆంధ్రప్రదేశ్ రాష్ట్ర మంత్రివర్యులు  శ్రీ నారా చంద్రబాబు నాయుడు గారు.png", title: "ఆంధ్రప్రదేశ్ రాష్ట్ర మాన్య ముఖ్యమంత్రివర్యులు గౌరవనీయులు శ్రీ నారా చంద్రబాబు నాయుడు గారు", subtitle: "Honorable Chief Minister of Andhra Pradesh – Sri Nara Chandrababu Naidu Garu" },
    { image: "Pramukhalu/Politicians & Leaders/ఆంధ్రప్రదేశ్ అసెంబ్లీ 1వ డిప్యూటీ స్పీకర్   శ్రీ మండలి బుద్ధ ప్రసాద్ గారు.png", title: "ఆంధ్రప్రదేశ్ అసెంబ్లీ 1వ డిప్యూటీ స్పీకర్ శ్రీ మండలి బుద్ధ ప్రసాద్ గారు", subtitle: "Andhra Pradesh Assembly 1st Deputy Speaker – Shri Mandali Buddha Prasad Garu" },
    { image: "Pramukhalu/Politicians & Leaders/తెలంగాణ రాష్ట్ర సలహాదారు శ్రీమాన్ కెవి రమణాచారి గారు.png", title: "తెలంగాణ రాష్ట్ర సలహాదారు శ్రీమాన్ కెవి రమణాచారి గారు", subtitle: "Telangana State Advisor – Sriman K. V. Ramanachari Garu" },
    { image: "Pramukhalu/Politicians & Leaders/మాజీ ఎమ్మెల్యే శ్రీ వర్ల రామయ్య గారు.png", title: "మాజీ ఎమ్మెల్యే శ్రీ వర్ల రామయ్య గారు", subtitle: "Former MLA – Shri Varla Ramaiah Garu" },
    { image: "Pramukhalu/Politicians & Leaders/శ్రీ అయితాబత్తుల ఆనంద రావు గారు ఎమ్మెల్యే.png", title: "శ్రీ అయితాబత్తుల ఆనంద రావు గారు ఎమ్మెల్యే", subtitle: "MLA – Shri Ayithabattula Ananda Rao Garu" },
    { image: "Pramukhalu/Politicians & Leaders/మాజీ కుప్పం నియోజకవర్గం తెలుగుదేశం ఇంచార్జ్-శ్రీ పి ఎస్ మునిరత్నం గారు.png", title: "మాజీ కుప్పం నియోజకవర్గం తెలుగుదేశం ఇంచార్జ్ శ్రీ పి ఎస్ మునిరత్నం గారు", subtitle: "Former Telugu Desam Party Kuppam Constituency Incharge – Shri P. S. Muniratnam Garu" },
    { image: "Pramukhalu/Politicians & Leaders/విజయవాడ సెంట్రల్ ఎమ్మెల్యే శ్రీ మల్లాడి విష్ణు గారు.png", title: "విజయవాడ సెంట్రల్ ఎమ్మెల్యే శ్రీ మల్లాడి విష్ణు గారు", subtitle: "Vijayawada Central MLA – Shri Malladi Vishnu Garu" },
    { image: "Pramukhalu/Politicians & Leaders/స్పీకర్             శ్రీ  పీతాని సత్యనారాయణ - మాజీ మంత్రివర్యులు‌.png", title: "శ్రీ పీతాని సత్యనారాయణ గారు – మాజీ మంత్రివర్యులు", subtitle: "Shri Peethani Satyanarayana Garu – Former Minister" },
    { image: "Pramukhalu/Politicians & Leaders/శ్రీ రాధా క్రిష్నయ్య బడేటి గారు  ఎమ్మెల్యే  ఏలూరు.png", title: "శ్రీ రాధా క్రిష్నయ్య బడేటి గారు ఎమ్మెల్యే – ఏలూరు", subtitle: "Shri Radha Krishnayya Badeti Garu – MLA, Eluru" },
    { image: "Pramukhalu/Politicians & Leaders/నరసాపురం ఎమ్మెల్యే శ్రీ బండారు మాధవ నాయుడు గారు.png", title: "నరసాపురం ఎమ్మెల్యే శ్రీ బండారు మాధవ నాయుడు గారు", subtitle: "Narasapuram MLA – Shri Bandaru Madhava Naidu Garu" },
    { image: "Pramukhalu/Politicians & Leaders/మాజీ మంత్రివర్యులు శ్రీ  మరడాని రంగారావు గారు.png", title: "మాజీ మంత్రివర్యులు శ్రీ మరడాని రంగారావు గారు", subtitle: "Former Minister – Shri Maradani Ranga Rao Garu" },
    { image: "Pramukhalu/Politicians & Leaders/శ్రీ సిరికొండ మధుసూధనాచారి  తెలంగాణ రాష్ట్ర శాసనసభ తొలి స్పీకర్.png", title: "శ్రీ సిరికొండ మధుసూధనాచారి – తెలంగాణ రాష్ట్ర శాసనసభ తొలి స్పీకర్", subtitle: "Shri Sirikonda Madhusudhanachari – First Speaker of Telangana State Legislative Assembly" }
  ],
  spirituals: [
    { image: "Pramukhalu/Religious Mysteries Persons/బ్రహ్మశ్రీ చాగంటి కోటేశ్వరరావు గారు.png", title: "బ్రహ్మశ్రీ చాగంటి కోటేశ్వరరావు గారు", subtitle: "Brahmashri Chaganti Koteswara Rao Garu" },
    { image: "Pramukhalu/Religious Mysteries Persons/కళాభారతి  శ్రీ రాంబాబు గారు విశాఖపట్నం.png", title: "కళాభారతి శ్రీ రాంబాబు గారు విశాఖపట్నం", subtitle: "Kalabharati Shri Rambabu Garu – Visakhapatnam" },
    { image: "Pramukhalu/Religious Mysteries Persons/బ్రహ్మశ్రీ సామవేదం షణ్ముఖ శర్మ గారు.png", title: "బ్రహ్మశ్రీ సామవేదం షణ్ముఖ శర్మ గారు", subtitle: "Brahmashree Samavedam Shanmukha Sharma Garu" },
    { image: "Pramukhalu/Religious Mysteries Persons/శ్రీ సత్య సాయి సేవ సంస్థ హైదరాబాద్ అధినేత శ్రీ శంకర నారాయణ గారు.png", title: "శ్రీ సత్య సాయి సేవ సంస్థ హైదరాబాద్ అధినేత శ్రీ శంకర నారాయణ గారు", subtitle: "Shri Sankara Narayana Garu – Head of Sri Sathya Sai Seva Sanstha, Hyderabad" },
    { image: "Pramukhalu/Religious Mysteries Persons/శ్రీమతి భారతీయం సత్యవాణి గారు.png", title: "శ్రీమతి భారతీయం సత్యవాణి గారు", subtitle: "Smt. Bharatiyam Satyavani Garu" },
    { image: "Pramukhalu/Religious Mysteries Persons/శ్రీశ్రీశ్రీ స్వస్వరూపానంద గిరి స్వామి గారు.png", title: "శ్రీశ్రీశ్రీ స్వస్వరూపానంద గిరి స్వామి గారు", subtitle: "Sri Sri Sri Swaswarupananda Giri Swami Garu" }
  ],
  playback: [
    { image: "Film Celebrities/Film Playback singers/పద్మ విభూషణ్ SP బాలసుబ్రమణ్యం గారు.png", title: "పద్మ విభూషణ్ ఎస్. పి. బాలసుబ్రహ్మణ్యం గారు", subtitle: "Padma Vibhushan S. P. Balasubrahmanyam Garu" },
    { image: "Film Celebrities/Film Playback singers/గాన కోకిల  శ్రీమతి పి సుశీలమ్మ గారు.png", title: "గాన కోకిల శ్రీమతి పి. సుశీలమ్మ గారు", subtitle: "Gana Kokila Smt. P. Susheela Garu" },
    { image: "Film Celebrities/Film Playback singers/గాయనీమణి శ్రీమతి ఎస్ జానకమ్మ గారు.png", title: "గాయనీమణి శ్రీమతి ఎస్. జానకమ్మ గారు", subtitle: "Gayani Mani Smt. S. Janaki Garu" },
    { image: "Film Celebrities/Film Playback singers/సంగీత దర్శకులు శ్రీ కోటి గారు.png", title: "సంగీత దర్శకులు శ్రీ కోటి గారు", subtitle: "Music Director Shri Koti Garu" },
    { image: "Film Celebrities/Film Playback singers/సంగీత దర్శకులు శ్రీ చక్రి గారి సోదరి ఆదర్శిణి గారు.png", title: "సంగీత దర్శకులు శ్రీ చక్రి గారి సోదరి ఆదర్శిణి గారు", subtitle: "Adarshini Garu – Sister of Music Director Chakri" },
    { image: "Film Celebrities/Film Playback singers/శ్రీ బి ఏ నారాయణ గారు.png", title: "శ్రీ బి. ఏ. నారాయణ గారు", subtitle: "Shri B. A. Narayana Garu" },
    { image: "Film Celebrities/Film Playback singers/శ్రీ పవన్ గారు.png", title: "శ్రీ పవన్ గారు", subtitle: "Shri Pawan Garu" }
  ],
  filmArtist: [
    { image: "Film Celebrities/Film Artists & Directors/కళాతపస్వి శ్రీ కె విశ్వనాథ్ గారు.png", title: "కళాతపస్వి శ్రీ కె విశ్వనాథ్ గారు", subtitle: "Kalathapaswi Shri K. Vishwanath Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీ గొల్లపూడి మారుతీ రావు గారు.png", title: "శ్రీ గొల్లపూడి మారుతీ రావు గారు", subtitle: "Shri Gollapudi Maruti Rao Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీ మురళీమోహన్ గారు.png", title: "శ్రీ మురళీమోహన్ గారు", subtitle: "Shri Murali Mohan Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీ సుమన్ గారు.png", title: "శ్రీ సుమన్ గారు", subtitle: "Shri Suman Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీమతి శివ పార్వతి గారు.png", title: "శ్రీమతి శివ పార్వతి గారు", subtitle: "Smt. Shiva Parvati Garu" },
    { image: "Film Celebrities/Film Artists & Directors/కరాటే కళ్యాణి ,జ్యోతి గార్లు.png", title: "కరాటే కళ్యాణి , జ్యోతి గార్లు", subtitle: "Karate Kalyani, Jyothi Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీ ఆలీ గారు.png", title: "శ్రీ ఆలీ గారు", subtitle: "Shri Ali Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీ కళ్ళ చిదంబరం గారు.png", title: "శ్రీ కళ్ళ చిదంబరం గారు", subtitle: "Shri Kalla Chidambaram Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీ ఎస్వీ కృష్ణారెడ్డి గారు శ్రీ అచ్చిరెడ్డి గారు.png", title: "శ్రీ ఎస్వీ కృష్ణారెడ్డి గారు, శ్రీ అచ్చిరెడ్డి గారు", subtitle: "Shri S. V. Krishna Reddy Garu, Shri Acchi Reddy Garu" },
    { image: "Film Celebrities/Film Artists & Directors/శ్రీ జేకే భారవి గారు.png", title: "శ్రీ జేకే భారవి గారు", subtitle: "Shri J. K. Bharavi Garu" },
    { image: "Film Celebrities/Film Artists & Directors/అల్లరి సుభాషిణి గారు.png", title: "అల్లరి సుభాషిణి గారు", subtitle: "Allari Subhashini Garu" }
  ],
  awards: [
    { image: "Awards & Publications/Awards/గౌరవ డాక్టరేట్.png", title: "గౌరవ డాక్టరేట్", subtitle: "Honorary Doctorate", video: "https://www.youtube.com/watch?v=Ju_zR0dze_0" },
    { image: "Awards & Publications/Awards/కళారత్న( హంస అవార్డు).png", title: "కళారత్న (హంస అవార్డు – 2025)", subtitle: "Kalarathna (Hamsa Award – 2025)", video: "https://www.youtube.com/watch?v=NGOY18MYbhs" },
    { image: "Awards & Publications/Awards/హెచ్ సి ఎం అవార్డు.png", title: "హెచ్ సి ఎం అవార్డు", subtitle: "HCM Award" },
    { image: "Awards & Publications/Awards/జాతీయ బంగారు నంది పురస్కారం.png", title: "జాతీయ బంగారు నంది పురస్కారం", subtitle: "National Gold Nandi Award", video: "https://www.youtube.com/watch?v=g19igXDqXlg" },
    { image: "Awards & Publications/Awards/భారత కళా రత్న అవార్డు.png", title: "భారత కళా రత్న అవార్డు", subtitle: "Bharat Kala Rathna Award", video: "https://youtu.be/Ju_zR0dze_0" },
    { image: "Awards & Publications/Awards/రజిత కిరీట ధారణ.png", title: "రజిత కిరీట ధారణ", subtitle: "Rajita Kirita Dharana", video: "https://youtu.be/09fwCzwNBHw" },
    { image: "Awards & Publications/Awards/స్వర్ణ కంకణ ఘన సన్మానo-2010,ఏలూరు.png", title: "స్వర్ణ కంకణ ఘన సన్మానం – 2010, ఏలూరు", subtitle: "Swarna Kankana Ghana Sanmanam – 2010, Eluru", video: "https://youtu.be/hISOfuqGCvY" },
    { image: "Awards & Publications/Awards/సువర్ణ హస్త కంకణ ఘన సన్మానం-2023, అనకాపల్లి..png", title: "సువర్ణ హస్త కంకణ ఘన సన్మానం – 2023, అనకాపల్లి", subtitle: "Suvarna Hasta Kankana Ghana Sanmanam – 2023, Anakapalli", video: "https://www.youtube.com/watch?v=YBwAx3kPOsE" },
    { image: "Awards & Publications/Awards/లింకా బుక్ అవార్డు.png", title: "లింకా బుక్ అవార్డు", subtitle: "Linca Book Award" },
    { image: "Awards & Publications/Awards/హరికథారత్న బిరుదు ప్రధానం.png", title: "హరికథారత్న బిరుదు ప్రధానం", subtitle: "Harikatha Rathna Award", video: "https://youtu.be/2rgftlcuWSM" },
    { image: "Awards & Publications/Awards/హరికథా సరస్వతి బిరుదు ప్రధానం.png", title: "హరికథా సరస్వతి బిరుదు ప్రధానం", subtitle: "Harikatha Saraswati Award" },
    { image: "Awards & Publications/Awards/హరికథా భారతి బిరుదు ప్రధానం.png", title: "హరికథా భారతి బిరుదు ప్రధానం", subtitle: "Harikatha Bharathi Award" },
    { image: "Awards & Publications/Awards/హరికథ చూడామణి బిరుదు ప్రధానం.png", title: "హరికథ చూడామణి బిరుదు ప్రధానం", subtitle: "Harikatha Chudamani Award" },
    { image: "Awards & Publications/Awards/హరికథ గాన ప్రపూర్ణ బిరుదు ప్రధానం.png", title: "హరికథ గాన ప్రపూర్ణ బిరుదు ప్రధానం", subtitle: "Harikatha Gana Prapurna Award", video: "https://youtu.be/j3ZZHhQVCWY" },
    { image: "Awards & Publications/Awards/శ్రీ సర్వారాయ హరికథ పాఠశాల, వెండి కంకణ ధారణ.png", title: "శ్రీ సర్వారాయ హరికథ పాఠశాల – వెండి కంకణ ధారణ", subtitle: "Sri Sarvaraya Harikatha Pathasala – Silver Bracelet Honour" },
    { image: "Awards & Publications/Awards/శ్రీ స్వామి వివేకానంద ఎక్సలెన్సీ అవార్డు.png", title: "శ్రీ స్వామి వివేకానంద ఎక్సలెన్సీ అవార్డు", subtitle: "Sri Swami Vivekananda Excellence Award" },
    { image: "Awards & Publications/Awards/బంగారు చైను తో సత్కారం.png", title: "బంగారు చైను తో సత్కారం", subtitle: "Bangaru Chain Satkaram" },
    { image: "Awards & Publications/Awards/నాట్య మయూరి బిరుదు ప్రధానం.png", title: "నాట్య మయూరి బిరుదు ప్రధానం", subtitle: "Natya Mayuri Award" },
    { image: "Awards & Publications/Awards/సకల కళాభారతి.png", title: "సకల కళాభారతి", subtitle: "Sakala Kalabharati" },
    { image: "Awards & Publications/Awards/హరికథాగాన ప్రవీణ బిరుదు ప్రధానo.png", title: "హరికథాగాన ప్రవీణ బిరుదు ప్రధానం", subtitle: "Harikatha Gana Praveena Award" },
    { image: "Awards & Publications/Awards/ఆత్మీయ సత్కార సన్మాన పత్రంశ్రీ శ్రీ రామ రక్షా సేవా సంఘం.png", title: "ఆత్మీయ సత్కార సన్మాన పత్రం – శ్రీ శ్రీ రామ రక్షా సేవా సంఘం", subtitle: "Aatmiya Satkara Sanmana Patram – Sri Rama Raksha Seva Sangham" },
    { image: "Awards & Publications/Awards/అనర్గళ కంఠామృతం.png", title: "అనర్గళ కంఠామృతం", subtitle: "Anargala Kanthamrutam" }
  ]
};

const galleryState = {};

function getHeaderOffset() {
  const header = document.querySelector(HEADER_SELECTOR);
  return header ? header.offsetHeight + 12 : 0;
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!toggle || !mobileNav) {
    return;
  }

  const closeMenu = () => {
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const shouldOpen = !mobileNav.classList.contains("is-open");
    toggle.classList.toggle("is-open", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    mobileNav.classList.toggle("is-open", shouldOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", targetId);
    });
  });
}

function createPhotoCard(item) {
  const article = document.createElement("article");
  article.className = `photo-card${item.video ? " photo-card-has-video" : ""}`;

  const videoOverlay = item.video
    ? `<a class="photo-card-video-overlay" href="${item.video}" target="_blank" rel="noopener" aria-label="Watch award video">
        <span class="photo-card-video-overlay-icon" aria-hidden="true">▶</span>
      </a>`
    : "";

  const videoButton = item.video
    ? `<div class="award-video">
        <a href="${item.video}" target="_blank" rel="noopener">
          <span class="award-video-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M23 12s0-3.4-.4-5c-.2-1.1-1.1-2-2.2-2.3C18.5 4.2 12 4.2 12 4.2s-6.5 0-8.4.5C2.5 4.9 1.6 5.8 1.4 6.9 1 8.6 1 12 1 12s0 3.4.4 5.1c.2 1.1 1.1 2 2.2 2.2 1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5c1.1-.2 2-1.1 2.2-2.2.4-1.7.4-5.1.4-5.1Zm-13 3.4V8.6l5.8 3.4L10 15.4Z"/></svg>
          </span>
          <span>Watch Award Video</span>
        </a>
      </div>`
    : "";

  article.innerHTML = `
    <div class="photo-card-media">
      <!-- TODO: Replace image path or map to API image field -->
      <img src="${item.image}" alt="${item.title}">
      ${videoOverlay}
    </div>
    <div class="photo-card-body">
      <h3 class="photo-card-title">${item.title}</h3>
      <p class="photo-card-subtitle">${item.subtitle || "Add subtitle here"}</p>
      ${videoButton}
    </div>
  `;

  return article;
}

function updateGalleryActions(sectionKey) {
  const items = SECTION_DATA[sectionKey] || [];
  const rendered = galleryState[sectionKey] || 0;
  const moreButton = document.querySelector(`[data-gallery-more="${sectionKey}"]`);
  const actions = document.querySelector(`[data-gallery-actions="${sectionKey}"]`);

  if (!moreButton) {
    return;
  }

  const hasMore = rendered < items.length;
  moreButton.hidden = items.length === 0;

  if (hasMore) {
    moreButton.dataset.galleryMode = "reveal";
    moreButton.disabled = false;
    moreButton.innerHTML = 'View More <span class="btn-arrow" aria-hidden="true">→</span>';
  } else {
    moreButton.dataset.galleryMode = "complete";
    moreButton.disabled = true;
    moreButton.textContent = "All Images Loaded";
  }

  if (actions) {
    actions.hidden = items.length === 0;
  }
}

function renderGallerySection(sectionKey, countToAdd) {
  const container = document.querySelector(`[data-gallery="${sectionKey}"]`);
  const items = SECTION_DATA[sectionKey] || [];

  if (!container) {
    return;
  }

  const alreadyRendered = galleryState[sectionKey] || 0;
  const nextCount = Math.min(alreadyRendered + countToAdd, items.length);
  const nextItems = items.slice(alreadyRendered, nextCount);

  nextItems.forEach((item) => {
    container.appendChild(createPhotoCard(item));
  });

  galleryState[sectionKey] = nextCount;
  updateGalleryActions(sectionKey);
}

function setupGallerySections() {
  const galleryContainers = document.querySelectorAll("[data-gallery]");

  galleryContainers.forEach((container) => {
    const sectionKey = container.dataset.gallery;
    galleryState[sectionKey] = 0;
    renderGallerySection(sectionKey, INITIAL_RENDER_COUNT);
  });

  document.querySelectorAll("[data-gallery-more]").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionKey = button.dataset.galleryMore;
      const mode = button.dataset.galleryMode;

      if (mode !== "reveal") {
        return;
      }

      renderGallerySection(sectionKey, RENDER_STEP);
    });
  });
}

function setActiveLanguage(language) {
  const isEnglish = language === "en";
  const englishPanel = document.getElementById("about-en");
  const teluguPanel = document.getElementById("about-te");
  const englishButton = document.querySelector('[data-lang-target="en"]');
  const teluguButton = document.querySelector('[data-lang-target="te"]');

  if (!englishPanel || !teluguPanel || !englishButton || !teluguButton) {
    return;
  }

  englishPanel.hidden = !isEnglish;
  teluguPanel.hidden = isEnglish;
  englishButton.classList.toggle("is-active", isEnglish);
  teluguButton.classList.toggle("is-active", !isEnglish);
  englishButton.setAttribute("aria-pressed", String(isEnglish));
  teluguButton.setAttribute("aria-pressed", String(!isEnglish));
}

function setupLanguageToggle() {
  const buttons = document.querySelectorAll("[data-lang-target]");
  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveLanguage(button.dataset.langTarget);
    });
  });
}

function setupATopModal() {
  const modal = document.getElementById("a-top-modal");
  const openButtons = document.querySelectorAll("[data-open-a-top]");
  const closeButton = modal ? modal.querySelector("[data-close-modal]") : null;
  let lastTrigger = null;

  if (!modal || openButtons.length === 0 || !closeButton) {
    return;
  }

  const openModal = (trigger) => {
    lastTrigger = trigger;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastTrigger) {
      lastTrigger.focus();
    }
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button));
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

function setupCurrentPageIndicator() {
  const page = document.body.dataset.page;
  if (!page) {
    return;
  }

  const activeHref = page === "about" ? "about.html" : "index.html";
  document.querySelectorAll(`a[href="${activeHref}"]`).forEach((link) => {
    link.classList.add("is-active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupCurrentPageIndicator();
  setupMobileMenu();
  setupSmoothScroll();
  setupGallerySections();
  setupLanguageToggle();
  setupATopModal();
});
