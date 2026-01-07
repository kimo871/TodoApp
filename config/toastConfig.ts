

export const toastConfig = {
  placement: "top",
  style: {
    width: '65%',
    padding: 16,
    borderRadius: 12,
    alignSelf: 'center',
  },
  offset: 50,
  offsetTop: 100,
  offsetBottom: 40,
  animationType: "slide-in",
  animationDuration: 250,
  duration: 2000,
  swipeEnabled: true,
  successColor: '#22c55e',
  dangerColor: '#ef4444',
  warningColor: '#facc15',
  normalColor: '#22c55e',
  textStyle: { 
    fontSize: 16, 
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  titleStyle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
} as const;