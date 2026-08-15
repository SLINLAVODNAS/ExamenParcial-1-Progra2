import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Interfaz para definir el tipo Estudiante
interface Estudiante {
  id: number;
  nombre: string;
  carnet: string;
}

// ---------------- TAB 1: INICIO ----------------
function InicioScreen() {
  const [contador, setContador] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>ExamenProgramacionII</Text>
      <Text style={styles.tabSubtitle}>Pestaña de Inicio</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Contador Actual:</Text>
        <Text style={styles.counterValue}>{contador}</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setContador(prev => prev + 1)}
        >
          <Text style={styles.buttonText}>+ Incrementar Contador</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ---------------- TAB 2: ESTUDIANTES ----------------
interface EstudiantesProps {
  estudiantes: Estudiante[];
  setEstudiantes: React.Dispatch<React.SetStateAction<Estudiante[]>>;
}

function EstudiantesScreen({ estudiantes, setEstudiantes }: EstudiantesProps) {
  const agregarEstudiante = () => {
    const nuevoId = estudiantes.length + 1;
    const nombresEjemplo = ['Sofía López', 'Diego Mendoza', 'Valeria Castillo', 'Javier Ramos', 'Andrea Morales'];
    const nombreAleatorio = nombresEjemplo[(nuevoId - 1) % nombresEjemplo.length];

    const nuevo: Estudiante = {
      id: nuevoId,
      nombre: `${nombreAleatorio} (${nuevoId})`,
      carnet: `UMG-${2026000 + nuevoId}`,
    };

    setEstudiantes(prev => [...prev, nuevo]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Listado de Estudiantes</Text>

      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.studentName}>{item.nombre}</Text>
            <Text style={styles.studentDetails}>ID: {item.id} | Carnet: {item.carnet}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={agregarEstudiante}>
        <Text style={styles.buttonText}>+ Agregar Estudiante</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ---------------- TAB 3: ESTADÍSTICAS ----------------
interface EstadisticasProps {
  total: number;
}

function EstadisticasScreen({ total }: EstadisticasProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Estadísticas</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Cantidad de estudiantes registrados:</Text>
        <Text style={styles.statNumber}>{total}</Text>
      </View>
    </SafeAreaView>
  );
}

// ---------------- NAVEGADOR PRINCIPAL ----------------
const Tab = createBottomTabNavigator();

export default function App() {
  // Lista inicial de 4 estudiantes requerida
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    { id: 1, nombre: 'Carlos Ruiz', carnet: 'UMG-2026001' },
    { id: 2, nombre: 'Ana Morales', carnet: 'UMG-2026002' },
    { id: 3, nombre: 'Luis Estrada', carnet: 'UMG-2026003' },
    { id: 4, nombre: 'María González', carnet: 'UMG-2026004' },
  ]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#0284c7',
            tabBarInactiveTintColor: '#64748b',
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: 'bold',
            },
          }}
        >
          <Tab.Screen name="Inicio" component={InicioScreen} />
          <Tab.Screen name="Estudiantes">
            {() => <EstudiantesScreen estudiantes={estudiantes} setEstudiantes={setEstudiantes} />}
          </Tab.Screen>
          <Tab.Screen name="Estadísticas">
            {() => <EstadisticasScreen total={estudiantes.length} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ---------------- ESTILOS ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },
  tabSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 25,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 10,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0284c7',
    marginBottom: 20,
  },
  statNumber: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#10b981',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  studentDetails: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
});