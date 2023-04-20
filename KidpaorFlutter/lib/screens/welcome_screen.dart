import 'dart:async';

import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/screens/registration_screen.dart';
import 'package:observe_internet_connectivity/observe_internet_connectivity.dart';

import '../components/rounded_button.dart';
import 'login_screen.dart';

class WelcomeScreen extends StatefulWidget {
  static const String id = 'welcome_screen';

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;
  late Animation animation;
  late StreamSubscription subscription;
  bool isAlertSet = false;

  @override
  void initState() {
    getConnectivity();
    super.initState();

    controller =
        AnimationController(duration: const Duration(seconds: 1), vsync: this);
    animation = ColorTween(begin: Colors.blueGrey, end: Colors.white)
        .animate(controller);
    controller.forward();
    controller.addListener(() {
      setState(() {});
    });
  }

  getConnectivity() => subscription = Connectivity()
          .onConnectivityChanged
          .listen((ConnectivityResult result) async {
        final hasInternet = await InternetConnectivity().hasInternetConnection;
        if (!hasInternet && isAlertSet == false) {
          showDialogBox();
          setState(() {
            isAlertSet = true;
          });
        }
      });

  @override
  void dispose() {
    subscription.cancel();
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: animation.value,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                Hero(
                  tag: 'kidpaor-logo',
                  child: SizedBox(
                    height: 90,
                    child: Image.asset('images/kidpaor-logo.png'),
                  ),
                ),
                AnimatedTextKit(
                  animatedTexts: [
                    TypewriterAnimatedText(
                      'Kidpaor Chat',
                      textStyle: const TextStyle(
                          fontSize: 35.0,
                          fontWeight: FontWeight.bold,
                          color: Colors.black54),
                      speed: const Duration(milliseconds: 200),
                    ),
                  ],
                  displayFullTextOnTap: true,
                ),
              ],
            ),
            const SizedBox(
              height: 48.0,
            ),
            RoundedButton(
                color: const Color(0xFFFDBF46),
                title: 'Log in',
                onPressed: () {
                  Navigator.pushNamed(context, LoginScreen.id);
                }),
            RoundedButton(
                color: const Color(0xFFD29432),
                title: 'Register',
                onPressed: () {
                  Navigator.pushNamed(context, RegistrationScreen.id);
                }),
          ],
        ),
      ),
    );
  }

  showDialogBox() => showCupertinoDialog<String>(
        context: context,
        builder: (BuildContext context) => CupertinoAlertDialog(
          title: const Text('No Connection'),
          content: const Text('Please check your internet connectivity'),
          actions: <Widget>[
            TextButton(
              onPressed: () async {
                Navigator.pop(context, 'Cancel');
                setState(() => isAlertSet = false);
                final hasInternet =
                    await InternetConnectivity().hasInternetConnection;
                if (!hasInternet && isAlertSet == false) {
                  showDialogBox();
                  setState(() => isAlertSet = true);
                }
              },
              child: const Text('OK'),
            ),
          ],
        ),
      );
}
