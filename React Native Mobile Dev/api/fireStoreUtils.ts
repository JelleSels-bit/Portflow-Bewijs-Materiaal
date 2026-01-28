import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
} from '@/model/fireBaseTypes'
import {collection, getFirestore} from '@react-native-firebase/firestore'

export function getCollectionRef<T extends DocumentData>(collectionName: string): CollectionReference<T> {
  return collection(getFirestore(), collectionName) as CollectionReference<T>
}

export function getDocumentRef<T extends DocumentData>(collection: string, documentId: string): DocumentReference<T> {
  return getCollectionRef<T>(collection).doc(documentId)
}

export async function documentData<T extends DocumentData>(
  collection: string,
  documentId: string,
  idField: Extract<keyof T, string>,
): Promise<T | undefined> {
  const documentSnapshot = await getDocumentRef<T>(collection, documentId).get()
  return getDataFromDocumentSnapshot<T>(documentSnapshot, idField)
}

export function getDataFromDocumentSnapshot<T extends DocumentData>(
  snapshot: DocumentSnapshot<T>,
  idField: Extract<keyof T, string>,
): T | undefined {
  const data: T | undefined = snapshot.data()

  if (data) {
    return {
      ...data,
      [idField]: snapshot.id,
    }
  }

  return undefined
}

export async function collectionData<T extends DocumentData>(collection: string, idField: Extract<keyof T, string>) {
  const collectionSnapshot = await getCollectionRef<T>(collection).get()
  return getDataFromQuerySnapshot<T>(collectionSnapshot, idField)
}

export function getDataFromQuerySnapshot<T extends DocumentData>(
  snapshot: QuerySnapshot<T>,
  idField: Extract<keyof T, string>,
): T[] {
  return snapshot.docs.map(doc => {
    return {
      ...doc.data(),
      [idField]: doc.id,
    }
  })
}
