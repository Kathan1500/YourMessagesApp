import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function App() {
  const [directories, setDirectories] = useState([
    { id: '1', name: 'Personal', messages: ['Call mom', 'Buy groceries'] },
    { id: '2', name: 'Work', messages: ['Team meeting at 3 PM', 'Send progress report'] },
    { id: '3', name: 'School', messages: ['Math homework', 'Science fair project'] },
    { id: '4', name: 'Home', messages: ['Clean kitchen', 'Fix leaking tap'] },
    { id: '5', name: 'Love', messages: ['Anniversary plans', 'Surprise dinner idea'] },
    { id: '6', name: 'Family', messages: ['Plan family trip', 'Call grandma'] },
    { id: '7', name: 'Friends', messages: ['Movie night', 'Organize BBQ'] },
    { id: '8', name: 'Hobbies', messages: ['Practice guitar', 'Draw landscape'] },
  ]);

  const [selectedDir, setSelectedDir] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newDirName, setNewDirName] = useState('');
  const [dirModalVisible, setDirModalVisible] = useState(false);

  const circleColors = ['#FFD6E8', '#D1F2EB', '#D6EAF8', '#F9E79F', '#E8DAEF', '#FADBD8'];

  const directoryIcons = {
    Personal: '👤',
    Work: '💼',
    School: '🏫',
    Home: '🏠',
    Love: '❤️',
    Family: '👨‍👩‍👧‍👦',
    Friends: '🤝',
    Hobbies: '🎨',
  };

  const handleDirectoryPress = (dir) => setSelectedDir(dir);

  const handleAddDirectory = () => {
    if (!newDirName.trim()) return;
    const newDir = {
      id: (directories.length + 1).toString(),
      name: newDirName,
      messages: [],
    };
    setDirectories([...directories, newDir]);
    setNewDirName('');
    setDirModalVisible(false);
  };

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;
    const updated = directories.map((d) =>
      d.id === selectedDir.id ? { ...d, messages: [...d.messages, newMessage] } : d
    );
    setDirectories(updated);
    setSelectedDir({ ...selectedDir, messages: [...selectedDir.messages, newMessage] });
    setNewMessage('');
    setModalVisible(false);
  };

  const handleDelete = (index) => {
    Alert.alert('Delete', 'Are you sure you want to delete this message?', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () => {
          const updatedMessages = [...selectedDir.messages];
          updatedMessages.splice(index, 1);
          const updatedDirs = directories.map((d) =>
            d.id === selectedDir.id ? { ...d, messages: updatedMessages } : d
          );
          setDirectories(updatedDirs);
          setSelectedDir({ ...selectedDir, messages: updatedMessages });
        },
      },
    ]);
  };

  const handleEdit = () => {
    const updatedMessages = [...selectedDir.messages];
    updatedMessages[editIndex] = newMessage;
    const updatedDirs = directories.map((d) =>
      d.id === selectedDir.id ? { ...d, messages: updatedMessages } : d
    );
    setDirectories(updatedDirs);
    setSelectedDir({ ...selectedDir, messages: updatedMessages });
    setNewMessage('');
    setEditIndex(null);
    setModalVisible(false);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setNewMessage(selectedDir.messages[index]);
    setModalVisible(true);
  };

  const openAddModal = () => {
    setEditIndex(null);
    setNewMessage('');
    setModalVisible(true);
  };

  const MessageInputModal = () => (
    <Modal transparent animationType="slide" visible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{editIndex !== null ? 'Edit Message' : 'New Message'}</Text>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Enter message"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={editIndex !== null ? handleEdit : handleAddMessage}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const AddDirectoryModal = () => (
    <Modal transparent animationType="slide" visible={dirModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>New Directory</Text>
          <TextInput
            style={styles.input}
            value={newDirName}
            onChangeText={setNewDirName}
            placeholder="Enter directory name"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setDirModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtn} onPress={handleAddDirectory}>
              <Text style={styles.saveText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📁 Message Manager</Text>

      {!selectedDir ? (
        <View style={styles.homeWrapper}>
          <ScrollView contentContainerStyle={styles.iconGrid}>
            {directories.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.circleBtn, { backgroundColor: circleColors[index % circleColors.length] }]}
                onPress={() => handleDirectoryPress(item)}
              >
                <Text style={styles.circleEmoji}>{directoryIcons[item.name] || '📁'}</Text>
                <Text style={styles.circleLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.bottomAddBtnWrapper}>
            <TouchableOpacity style={styles.addBtn} onPress={() => setDirModalVisible(true)}>
              <Text style={styles.addText}>➕ Add Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <TouchableOpacity onPress={() => setSelectedDir(null)}>
            <Text style={styles.backBtn}>⬅ Back to Directories</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Messages in {selectedDir.name}</Text>
          {selectedDir.messages.length === 0 && <Text style={styles.empty}>No messages found.</Text>}
          {selectedDir.messages.map((msg, idx) => (
            <View key={idx} style={styles.messageCard}>
              <Text style={styles.messageText}>{msg}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => openEditModal(idx)}>
                  <Text style={styles.edit}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(idx)}>
                  <Text style={styles.delete}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
            <Text style={styles.addText}>➕ Add Message</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {MessageInputModal()}
      {AddDirectoryModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#4a90e2',
    color: '#fff',
  },
  homeWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomAddBtnWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 20,
  },
  circleBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  circleEmoji: { fontSize: 28, marginBottom: 4 },
  circleLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  innerContainer: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  backBtn: { color: '#4a90e2', marginBottom: 10 },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: { fontSize: 16, color: '#333' },
  actions: { flexDirection: 'row', gap: 10 },
  edit: { fontSize: 18, color: '#4a90e2' },
  delete: { fontSize: 18, color: '#e74c3c' },
  addBtn: {
    backgroundColor: '#4a90e2',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  addText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  empty: { marginTop: 20, color: '#888' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    margin: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cancelText: { color: '#888' },
  saveText: { color: '#fff', fontWeight: 'bold' },
});