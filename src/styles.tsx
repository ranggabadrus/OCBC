import {Dimensions, StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  marginBottom10: {marginBottom: 10},
  textNavy: {color: 'navy'},
  close: {
    alignSelf: 'flex-end',
    backgroundColor: 'navy',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  text: {
    width: 100,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  successDetails: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
  },

  textCenter: {
    textAlign: 'center',
  },
  btnFailedOutline: {
    borderWidth: 2,
    borderColor: '#000',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  btnFailed: {
    backgroundColor: '#000',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  btnSuccessOutline: {
    borderWidth: 2,
    borderColor: '#20cb9d',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  btnSuccess: {
    backgroundColor: '#20cb9d',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  success: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formDefault: {
    borderWidth: 1,
    borderColor: '#dedede',
    backgroundColor: '#fff',
  },
  transferContainer: {padding: 20, flex: 1},
  floatBtn: {
    backgroundColor: 'navy',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
  },
  float: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 100,
    borderWidth: 2,
    borderColor: '#eaeaea',
    // elevation: 20,
    padding: 10,
    marginVertical: 5,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 20,
  },
  logout: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  header: {
    borderWidth: 2,
    borderColor: 'navy',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomEndRadius: 50,
    borderTopEndRadius: 50,
    width: Dimensions.get('screen').width * 0.8,
    elevation: 20,
    padding: 20,
  },
  btnActive: {
    backgroundColor: '#fff',
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 5,
  },
  btnInactive: {
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#fff',
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {width: 50, height: 50, marginHorizontal: 10},
  logo: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    margin: 10,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLogin: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    elevation: 5,
  },
  containerButton: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  formEmail: {
    color: '#fff',
    backgroundColor: '#233878',
    borderRadius: 20,
  },
  marginBottom: {marginBottom: 20},
  bLogin: {
    backgroundColor: 'red',
  },
  sideMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'navy',
  },
  login: {
    height: 500,
    width: 300,
    backgroundColor: '#17285e',
    borderRadius: 20,
    padding: 20,
    elevation: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginVertical: 20,
  },
  textWhite: {color: '#fff'},
  textBlack: {color: '#000'},
  textRed: {color: 'red'},
  textGreen: {color: '#20cb9d'},
  bold: {fontWeight: 'bold'},

  textLarge: {fontSize: 30, fontWeight: 'bold', color: '#000'},
  textMedium: {fontSize: 20, fontWeight: 'bold', color: '#000'},
  flex1: {
    flex: 1,
  },

  bgDefault: {
    backgroundColor: '#FAFAFA',
  },
  row: {
    flexDirection: 'row',
  },
  between: {
    justifyContent: 'space-between',
  },
});
