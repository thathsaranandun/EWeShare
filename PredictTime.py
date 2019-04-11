# Check the versions of libraries

# Python version
import sys
print('Python: {}'.format(sys.version))
# scipy
import scipy
print('scipy: {}'.format(scipy.__version__))
# numpy
import numpy
print('numpy: {}'.format(numpy.__version__))
# matplotlib
import matplotlib
print('matplotlib: {}'.format(matplotlib.__version__))
# pandas
import pandas
print('pandas: {}'.format(pandas.__version__))
# scikit-learn
import sklearn
print('sklearn: {}'.format(sklearn.__version__))


# Load libraries
import pandas
from pandas.plotting import scatter_matrix
import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

# Load dataset
#url = "evLocNew.csv"
#names = ['minutes', 'kWh', 'Model', 'Site']
#dataset = pandas.read_csv(url, names=names)

# Load libraries
from sklearn import datasets
from sklearn.preprocessing import StandardScaler

# Load data
#iris = datasets.load_iris()
#X = iris.data
#y = iris.target
data = pandas.read_csv("evLocNew.csv")
# Preview the first 5 lines of the loaded data
data.head()
array = data.values
print(array)

X = array[:,1:4]
print(X)
Y = array[:,0]
print('Y')
print(Y)
test_size = 0.2
seed = 9
X_train, X_test, Y_train, Y_test = model_selection.train_test_split(X, Y, test_size=test_size, random_state=seed)


# Standarize features
#scaler = StandardScaler()
#X_std = scaler.fit_transform(X_train)

from sklearn.svm import SVR

# Create one-vs-rest logistic regression object
#clf = LogisticRegression(random_state=seed, multi_class='multinomial', solver='newton-cg')
from sklearn.svm import LinearSVC

clf = LinearSVC(random_state=0, tol=1e-5,C=105)

#bayes = sklearn.naive_bayes.GaussianNB()
# Train model
#model = bayes.fit(X_train, Y_train)
model = clf.fit(X_train,Y_train)
# Create new observation
new_observation = [[1, 0.03, 3]]
print('X')
print(X_train)
print('Y')
print(Y_train)
# Predict class
print('Prediction Accuracy:')
output = model.predict(X_test)

# View predicted probabilities
#print('Predicted Probabilities')
#print(model.predict_proba(new_observation))

print(Y_test)
print(output)

acc = accuracy_score(Y_test,output)
print(acc)

singlePred = model.predict(new_observation)
print('single prediction')
print(singlePred)

