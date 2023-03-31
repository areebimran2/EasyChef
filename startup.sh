# python3 -m virtualenv -p 'which python' venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd backend
python3 manage.py makemigrations
python3 manage.py migrate
cd ../frontend
npm install
cd ..