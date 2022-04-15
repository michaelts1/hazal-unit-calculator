import { reactive } from 'vue'

const messages = {
	en: {
		_dir: 'ltr',
		_name: 'English',
		amah: 'amah',
		beitza: 'beitza',
		centimeterLong: 'centimeter',
		centimeterShort: 'cm',
		chazonIsh: 'Chazon Ish',
		copyright: '© Michael Tsaban',
		cubicCentimeterShort: 'cc',
		cubicMeterShort: 'cbm',
		darcon: 'darcon',
		eifa: 'eifa',
		eisar: 'eisar',
		etzba: 'etzba',
		grach: 'Rav Chaim Naeh',
		gramLong: 'gram',
		grogeret: 'grogeret',
		input: 'Input',
		invalidNumber: 'Please enter a number',
		kav: 'kav',
		kikar: 'kikar',
		kilogramLong: 'kilogram',
		kilogramShort: 'kg',
		kilometerLong: 'kilometer',
		kilometerShort: 'km',
		kor: 'kor',
		kortov: 'kortov',
		length: 'Length',
		literLong: 'liter',
		litra: 'litra',
		log: 'log',
		maeh: 'maeh',
		mane: 'mane',
		messageLength: 'Attention: The sit is calculated according to Maimonides',
		messageVolume: 'Attention: The peras is calculated according to Maimonide and the zait according to the Shulchan Aruch',
		meterLong: 'meter',
		mil: 'mil',
		milligramShort: 'mg',
		milligramLong: 'milligram',
		millimeterShort: 'mm',
		output: 'Output',
		parsa: 'parsa',
		peras: 'peras',
		posek: 'Posek',
		pruta: 'pruta',
		pundion: 'pundion',
		ris: 'ris',
		seah: 'seah',
		sela: 'sela',
		shekel: 'shekel',
		sit: 'sit',
		switchInputOutput: 'Switch input and output',
		tefach: 'tefach',
		title: 'Hazal Unit Calculator',
		type: 'Type',
		volume: 'Volume',
		weight: 'Weight / Coins',
		zait: 'zait',
		zeret: 'zeret',
		zuz: 'zuz',
	},

	he: {
		_dir: 'rtl',
		_name: 'עברית',
		amah: 'אמה',
		beitza: 'ביצה',
		centimeterLong: 'סנטימטר',
		centimeterShort: 'ס"מ',
		chazonIsh: 'חזון איש',
		copyright: '© מיכאל צבאן',
		cubicCentimeterShort: 'סמ"ק',
		cubicMeterShort: 'מ"ק',
		darcon: 'דרכון',
		eifa: 'איפה',
		eisar: 'איסר',
		etzba: 'אצבע',
		grach: 'רב חיים נאה',
		gramLong: 'גרם',
		grogeret: 'גרוגרת',
		input: 'קלט',
		invalidNumber: 'נא הכנס מספר',
		kav: 'קב',
		kikar: 'כיכר',
		kilogramLong: 'קילוגרם',
		kilogramShort: 'ק"ג',
		kilometerLong: 'קילומטר',
		kilometerShort: 'ק"מ',
		kor: 'כור',
		kortov: 'קורטוב',
		length: 'מרחק',
		literLong: 'ליטר',
		litra: 'ליטרא',
		log: 'לוג',
		maeh: 'מעה',
		mane: 'מנה',
		messageLength: 'שים לב: הסיט מחושב לפי שיטת הרמב"ם',
		messageVolume: 'שים לב: הפרס מחושב לפי שיטת הרמב"ם והזית לפי השולחן ערוך',
		meterLong: 'מטר',
		mil: 'מיל',
		milligramShort: 'מ"ג',
		milligramLong: 'מיליגרם',
		millimeterShort: 'מ"מ',
		output: 'תוצאה',
		parsa: 'פרסה',
		peras: 'פרס',
		posek: 'שיטת פסיקה',
		pruta: 'פרוטה',
		pundion: 'פונדיון',
		ris: 'ריס',
		seah: 'סאה',
		sela: 'סלע',
		shekel: 'שקל',
		sit: 'סיט',
		switchInputOutput: 'החלף בין הקלט לתוצאה',
		tefach: 'טפח',
		title: 'מחשבון יחידות תלמודיות',
		type: 'תחום',
		volume: 'נפח',
		weight: 'משקל / מטבעות',
		zait: 'זית',
		zeret: 'זרת',
		zuz: 'זוז',
	},
}

type MessagesLocale = keyof typeof messages
type Messages = typeof messages[MessagesLocale]
type MessageName = keyof Messages

class I18n {
	currentLocale: MessagesLocale
	messages!: Messages

	constructor(locale: MessagesLocale) {
		this.currentLocale = locale
		this.changeLocale(locale)
	}

	t(name: MessageName, locale?: MessagesLocale) {
		return locale ? messages[locale][name] : this.messages[name]
	}

	changeLocale(locale: MessagesLocale) {
		this.currentLocale = locale
		localStorage.setItem('locale', locale)
		this.messages = messages[this.currentLocale]

		document.documentElement.dir = this.t('_dir')
		document.title = this.t('title')
	}
}

/** @returns {MessagesLocale} Last used locale, defaults to 'he' */
function getLocaleCookie(): MessagesLocale {
	const locale = localStorage.getItem('locale') as MessagesLocale | null
	return locale ?? 'he'
}

export const i18n = reactive(new I18n(getLocaleCookie()))
