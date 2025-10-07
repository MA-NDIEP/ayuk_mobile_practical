import React, { useState } from 'react';

import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
   TextInput,
   Modal,
  FlatList,
  Pressable,
  Alert  
  
} from 'react-native';
const Ticketitem = ({ item, onEdit, onDelete }) => {
  const handlePress = () => {
    
    Alert.alert(
      'Ticket Actions',
      'Do you want to modify or delete this ticket',
      [
        {
          text: 'Edit',
          onPress: () => onEdit()
        },
        {
          text: 'Delete',
          onPress: () => onDelete(item.id),
          style: 'destructive'
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

   return (
      <Pressable onPress={handlePress} style={({ pressed }) => [
      styles.Ticketitem,
      pressed && styles.TicketitemPressed
    ]}>
         <View style={styles.Ticketitem}>
      <View style={styles.TicketContent}>
    
         <Text style={[
          styles.TicketText
        ]}>
          {item.title}
        </Text>
         <Text style={[
          styles.TicketText
        ]}>
          {item.status}
        </Text>
      </View>
    </View>
    </Pressable>
  );
};

const TicketApp= () => {
  const [TicketInput, setTicketInput] = useState('');
   const [modalVisible, setModalVisible] = useState(false);
  const [Tickets, setTickets] = useState([
    { id: 1, title: 'Ayuk ticket', description: 'done with it', status: 'Completed', rating: '5' },
    { id: 2, title: 'Claudia ticket', description: 'Just created this', status: 'Created', rating: '3.5' },
    { id: 3, title: 'Astera ticket', description: 'Created this 2 hours ago', status: 'Created', rating: '5' },
    { id: 4, title: 'Forbin ticket', description: 'Still working on it', status: 'Under assistance', rating: '4' },
     { id: 5, title: 'Foning ticket', description: 'Finished it last week', status: 'Completed', rating: '4' },
  ]);

  const handleInputChange = (text) => {
    setTicketInput(text);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteModal = (ticketId) => {
    Alert.alert(
      'Delete Ticket',
      'Are you sure you want to delete this ticket?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTickets(Tickets.filter(ticket => ticket.id !== ticketId));
          }
        }
      ]
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Support Ticket App</Text>
      </View>

    <View style={styles.buttonSection}>
       <Pressable onPress={openModal} style={styles.addButton} >
          <Text style={styles.addButtonText}>Add New Ticket </Text>
        </Pressable>
      </View>
  
      <FlatList
        data={Tickets}
        renderItem={({ item }) => <Ticketitem item={item}  onEdit={openModal} onDelete={deleteModal} />}

        keyExtractor={(item) => item.title}
        style={styles.TicketList}
      />
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Ticket</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Ticket Title"
              value={TicketInput}
              onChangeText={handleInputChange}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Description"
              numberOfLines={5}
            />
          <View style={styles.StatusItem}>
        <Text style={styles.TicketText}>Select a Status</Text>
        <View style={styles.StatusActions}>
        <Pressable style={[styles.actionButton, styles.shareButton]}>
          <Text style={styles.actionText}>Created</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.updateButton]}>
          <Text style={styles.actionText}>Under Assistance</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.deleteButton]}>
          <Text style={styles.actionText}>Completed</Text>
        </Pressable>
      </View>
         </View>
            

            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              
              <Pressable style={[styles.modalButton, styles.saveButton]}>
                <Text style={styles.modalButtonText}>Save Ticket</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#f8fafc',
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e3a8a',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1e3a8a',
    paddingTop: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonSection: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#f8fafc',
    shadowColor: '#000',
     alignItems: 'center',
    justifyContent: 'space-between',
  },

  addButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 32,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    minWidth: 60,
  },

  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  TicketList: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  Ticketitem: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
  },
  TicketitemPressed: {
    backgroundColor: '#fef2f2',
    transform: [{ scale: 0.98 }],
  },
  TicketContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  TicketText: { 
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxHeight: '75%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e293b',
  },
  modalInput: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    padding: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#475569',
  },
  saveButton: {
    backgroundColor: '#dc2626',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  StatusActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',

  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 2,
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    borderColor:'#4CAF50',
    
  },
  updateButton: {
    borderColor:'#FFC107',
  },
  deleteButton: {
     borderColor:'#BF2222',
  },
  actionText: {
    color: '#00000',
    fontSize: 12,
    fontWeight: '500',
  },
});


export default TicketApp;