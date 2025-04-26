from flask import Blueprint, request, jsonify
from app.models.inventory import Inventory
from app.db import db

inventory_bp = Blueprint('inventory_routes', __name__)

@inventory_bp.route('/charities/<int:charity_id>/inventory', methods=['GET'])
def get_inventory(charity_id):
    inventory_items = Inventory.query.filter_by(charity_id=charity_id).all()
    return jsonify([{
        'id': item.id,
        'item_name': item.item_name,
        'quantity': item.quantity,
        'beneficiary_name': item.beneficiary_name
    } for item in inventory_items]), 200

@inventory_bp.route('/charities/<int:charity_id>/inventory', methods=['POST'])
def add_inventory_item(charity_id):
    data = request.get_json()
    new_item = Inventory(
        item_name=data['item_name'],
        quantity=data['quantity'],
        beneficiary_name=data.get('beneficiary_name')
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Inventory item added'}), 201

@inventory_bp.route('/charities/<int:charity_id>/inventory', methods=['DELETE'])
def delete_inventory_item(charity_id):
    data = request.get_json()
    inventory = Inventory(
        item_name=data['item_name'],
        quantity=data['quantity'],
        beneficiary_name=data.get('beneficiary_name')
    )
    db.session.delete(inventory)
    db.session.commit()
    return jsonify({'message': 'Inventory item deleted'}), 201