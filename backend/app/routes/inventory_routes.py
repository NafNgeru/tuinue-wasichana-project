from flask import Blueprint, request, jsonify
from app.models.inventory import Inventory
from app.db import db

inventory_bp = Blueprint('inventory_routes',  __name__)

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
        charity_id=charity_id,
        item_name=data['item_name'],
        quantity=data['quantity'],
        beneficiary_name=data.get('beneficiary_name')
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Inventory item added'}), 201

@inventory_bp.route('/charities/<int:charity_id>/inventory/<int:item_id>', methods=['PUT'])
def update_inventory_item(charity_id, item_id):
    data = request.get_json()
    item = Inventory.query.filter_by(id=item_id, charity_id=charity_id).first()

    if not item:
        return jsonify({"error": "Item not found"}), 404
    
    item.item_name = data.get("item_name", item.item_name)
    item.quantity = data.get("quantity", item.quantity)
    item.beneficiary_name = data.get("beneficiary_name", item.beneficiary_name)

    db.session.commit()
    return jsonify({"message": "Item updated"}), 200

@inventory_bp.route('/charities/<int:charity_id>/inventory/<int:inventory_id>', methods=['DELETE'])
def delete_inventory_item(charity_id, inventory_id):
    inventory_item = Inventory.query.filter_by(id=inventory_id, charity_id=charity_id).first()

    if inventory_item is None:
        return jsonify({'error': 'Inventory item not found'}), 404

    db.session.delete(inventory_item)
    db.session.commit()
    return jsonify({'message': 'Inventory item deleted'}), 200

@inventory_bp.route('/charities/<int:charity_id>/beneficiaries/<int:beneficiary_id>/inventory', methods=['GET'])
def get_inventory_for_beneficiary(charity_id, beneficiary_id):
    inventory_items = Inventory.query.filter_by(beneficiary_id=beneficiary_id).all()
    return jsonify([item.serialize() for item in inventory_items]), 200
