import React, {useState} from 'react';
import {LayoutAnimation, TouchableOpacity, View} from 'react-native';
import styles from './styles'; // Assuming you have a styles file

const Accordion = props => {
  const {header, children, onAccordianPress, AccordionContainer} = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(prev => !prev);
    onAccordianPress();
  };

  return (
    <View style={[styles.AccordianContainer, AccordionContainer]}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.container}>
        {/* Only show the header when the accordion is closed */}
        {!isOpen ? header() : <View>{children}</View>}
      </TouchableOpacity>
      {/* Show children (content) only if the accordion is open */}
      {/* {isOpen && <View>{children}</View>} */}
    </View>
  );
};

export {Accordion};
